<script setup lang="ts">
import { ElIcon, ElImage, ElButton, ElProgress, ElMessage, useGlobalConfig } from 'element-plus'
import { Folder, Close, Plus, WarningFilled, FolderDelete } from '@element-plus/icons-vue'
import Upload from '@/utils/upload.class'
import { isString, uuidv4 } from '@/utils/util'

const props = defineProps({
    modelValue: { type: [String, Array] },
    limit: { type: Number, default: 1 },
    autoUpload: { type: Boolean, default: true },
    isCustom: { type: Boolean, default: false },
    beforeUpload: { type: Function, default: null },
    afterUpload: { type: Function, default: null },
    accept: {
        type: String,
        default: "image/*"
    },
    width: { type: Number, default: 80 },
    height: { type: Number, default: 80 },
    fileSize: { type: Number, default: 0 }
})

const loading = ref(false),
    globalConfig = useGlobalConfig(),
    uuid = ref(uuidv4()),
    fileBucket = ref<any>([]);

const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        if (props.limit === 1) {
            fileBucket.value = [{ path: newVal, status: 1, progress: 0, isImage: isImageFilePath(newVal) }]
        } else if (Array.isArray(newVal)) {
            fileBucket.value = (newVal as string[]).map((path: string) => ({
                path, status: 1, progress: 0, isImage: isImageFilePath(path)
            }))
        } else {
            fileBucket.value = []
        }
    } else {
        fileBucket.value = []
    }
}, { immediate: true })

const multiple = computed(() => {
    if (props.limit === -1) return true
    return props.limit > 1
}), disabled = computed(() => {
    if (props.limit === -1) return false
    return fileBucket.value.length >= props.limit
});

const change = (e: Event) => {
    const target = e.target as HTMLInputElement,
        files = target.files;
    if (files && files.length > 0) {
        Array.from(files).filter(file => {
            const isOverSize = props.fileSize > 0 && file.size > props.fileSize * 1024 * 1024;
            if (isOverSize) ElMessage.warning(globalConfig.value.locale?.name === 'en' ? `File ${file.name} size exceeds limit (${props.fileSize}MB)` : `文件 ${file.name} 大小超过限制 (${props.fileSize}MB)`);
            return !isOverSize
        }).forEach(file => {
            fileBucket.value.push({
                file,
                isImage: file.type.startsWith('image/'),
                status: 0,
                progress: 0,
                temporaryPath: URL.createObjectURL(file)
            })
        })
        if (props.autoUpload) uploading()
        target.value = ''
    }
}

const uploading = async () => {
    for (const item of (fileBucket.value || [])) {
        if (item.status === 1) continue
        const upload = new Upload()
        if (upload.isValidFileType(item.file, props.accept)) {
            if (props.beforeUpload) {
                await props.beforeUpload(item)
            }
            upload.action(item.file)
        } else {
            item.progress = 0
            item.status = -2
            upload.destroy()
        }
        upload.setProgressListener((progress: number) => item.progress = progress)
        upload.setCompleteListener(async (response: any) => {
            item.path = props.afterUpload ? props.afterUpload(response) : (response || null)
            item.status = 1
            upload.destroy()
            setTimeout(() => setData(), 300)
        })
        upload.setErrorListener((err) => {
            console.error('Upload error:', err)
            item.progress = 0
            item.status = -1
            upload.destroy()
        })
    }
}

const removeFile = (index: number | string) => {
    fileBucket.value.splice(Number(index), 1)
    setData()
    const input = document.getElementById(uuid.value) as HTMLInputElement
    input && (input.value = '')
}

const setData = () => {
    if (fileBucket.value.length === 0) {
        emit('update:modelValue', props.limit === 1 ? '' : [])
    } else {
        const data = fileBucket.value.map((item: any) => item.path)
        emit('update:modelValue', props.limit === 1 ? data[0] : data)
    }
}

function isImageFilePath(path: any): boolean {
    if (isString(path)) {
        return /\.(jpg|jpeg|png|gif|webp|svg|ico)(\?.*)?$/i.test(path)
    } else {
        return false
    }
}

const windowOpen = (path: string) => window.open(path, '_blank')

const getFileName = (parmas: any) => {
    if (isString(parmas)) {
        const filename = parmas.substring(parmas.lastIndexOf('/') + 1);
        const questionMarkIndex = filename.indexOf('?');
        return questionMarkIndex !== -1 ? filename.substring(0, questionMarkIndex) : filename
    } else if (parmas instanceof File) {
        return parmas.name;
    } else return '文件'
}

function autoCalcSize(ratio: number = 2) {
    const calc = Math.round(Math.min(props.width, props.height) / ratio);
    return calc > 5 ? calc : 12;
}

const uploadStyle = computed(() => ({
    '--upload-width': `${props.width}px`,
    '--upload-height': `${props.height}px`,
    '--upload-font-size': `${autoCalcSize(6.2)}px`
}))
</script>

<template>
    <div :class="$style['formkit-module-upload']" :style="uploadStyle">
        <div v-for="(it, index) in fileBucket" :key="index" :class="$style.uploadPrepare">
            <div :class="$style.warning" v-if="it.status === -1">
                <el-icon :size="autoCalcSize(2)" class="text-red"><WarningFilled /></el-icon>
            </div>
            <div :class="$style.warning" v-else-if="it.status === -2">
                <el-icon :size="autoCalcSize(2.1)" class="text-warning"><FolderDelete /></el-icon>
                <p>文件类型不合法</p>
            </div>
            <template v-else>
                <div class="w-full h-full cursor-pointer">
                    <el-image
                        class="w-full h-full"
                        v-if="it.isImage"
                        :src="it.path || it.temporaryPath"
                        :preview-src-list="[it.path]"
                        show-progress
                        :preview-teleported="true"
                        :initial-index="4"
                        fit="cover">
                        <template #placeholder>
                            <div :class="$style['image-slot']">Loading<span :class="$style.dot">...</span></div>
                        </template>
                    </el-image>
                    <div class="w-full h-full" :class="$style.uploadFolder" v-else @click="windowOpen(it.path || it.temporaryPath)">
                        <el-icon :size="autoCalcSize(3)"><Folder /></el-icon>
                        <div class="w-full ellipsis-2" :class="$style['folder-box']">{{ getFileName(it.file || it.path) }}</div>
                    </div>
                </div>
                <div :class="$style.progress" v-if="it.status === 0 && it.progress < 100">
                    <el-progress type="circle" :percentage="it.progress || 0" :width="autoCalcSize(2)" :stroke-width="3">
                        <template #default="{ percentage }">
                            <span :class="$style['percentage-value']">{{ percentage }}%</span>
                        </template>
                    </el-progress>
                </div>
            </template>
            <div :class="$style.close" @click="removeFile(index)">
                <el-button circle size="small" plain>
                    <el-icon><Close /></el-icon>
                </el-button>
            </div>
        </div>
        <div :class="$style.uploadContanier" v-if="!disabled">
            <input
                type="file"
                :id="uuid"
                @change="change"
                :disabled="loading || disabled"
                :accept="accept"
                :multiple="multiple" />
            <label :for="uuid" v-if="isCustom">
                <slot />
            </label>
            <label :for="uuid" :class="$style.label" v-else>
                <el-icon><Plus /></el-icon>
            </label>
        </div>
    </div>
</template>

<style module lang="scss">
.formkit-module-upload {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
    .uploadPrepare {
        position: relative;
        width: var(--upload-width);
        height: var(--upload-height);
        border: 1px solid #e4e7ec;
        border-radius: 6px;
        .warning {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
                color: white;
                font-size: 10px;
                line-height: 12px;
                margin-top: 4px;
                text-align: center;
            }
        }
        .progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, .78);
            :global(.el-progress__text) {
                min-width: 100%;
            }
            .percentage-value {
                font-size: var(--upload-font-size);
                color: white;
            }
        }
        .close {
            position: absolute;
            top: -10px;
            right: -6px;
            cursor: pointer;
            color: #fff;
        }
    }
    .uploadContanier {
        .label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: var(--upload-width);
            height: var(--upload-height);
            background: #FAFAFA;
            border: 1px dashed #cdd0d6;
            border-radius: 6px;
            &:hover {
                border-color: #409EFF;
            }
        }
    }
    .uploadFolder {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &:hover {
            background: #f5f5f5;
        }
        .folder-box {
            text-align: center;
            font-size: 12px;
            line-height: 12px;
            margin-top: 4px;
            padding: 0 2px;
        }
    }
    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 14px;
        .dot {
            animation: dot 2s infinite steps(3, start);
            overflow: hidden;
        }
    }
    input[type="file"]{ display: none }
}
</style>