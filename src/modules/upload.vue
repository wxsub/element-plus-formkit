<script setup lang="ts">
import { ElIcon, ElImage, ElButton, ElProgress } from 'element-plus'
import { Folder, Close, Plus, WarningFilled, FolderDelete } from '@element-plus/icons-vue'
import Upload from '@/utils/upload.class'
import { isString } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
    modelValue: { type: [String, Array] },
    limit: { type: Number, default: 1 },
    uploadUrl: { type: String, default: '' },
    autoUpload: { type: Boolean, default: true },
    isCustom: { type: Boolean, default: false },
    beforeUpload: { type: Function, default: null },
    parameterHandler: { type: Function, default: null },
    accept: {
        type: String,
        default: "image/*"
    },
    size: { type: Number, default: 80 }
})

const loading = ref(false),
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
        Array.from(files).forEach(file => {
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
        const upload = new Upload(props.uploadUrl)
        if (upload.isValidFileType(item.file, props.accept)) {
            await props.beforeUpload(item)
            upload.action(item.file, props.parameterHandler)
        } else {
            item.progress = 0
            item.status = -2
            upload.destroy()
        }
        upload.setProgressListener((progress: number) => item.progress = progress)
        upload.setCompleteListener(async (response: any) => {
            item.path = response || null
            item.status = 1
            upload.destroy()
            setTimeout(() => setData(), 300)
        })
        upload.setErrorListener(() => {
            item.progress = 0
            item.status = -1
            upload.destroy()
        })
    }
}

const removeFile = (index: number) => {
    fileBucket.value.splice(index, 1)
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
</script>

<template>
    <div class="formkit-module-upload">
        <div v-for="(it, index) in fileBucket" :key="index" class="uploadPrepare">
            <div class="warning" v-if="it.status === -1">
                <el-icon :size="(size / 2)" class="text-red"><WarningFilled /></el-icon>
            </div>
            <div class="warning" v-else-if="it.status === -2">
                <el-icon :size="(size / 2.1)" class="text-warning"><FolderDelete /></el-icon>
                <p class="text-white text-[10px] leading-[12px] mt-1 text-center">文件类型不合法</p>
            </div>
            <template v-else>
                <div class="w-full h-full cursor-pointer">
                    <el-image
                        class="w-full h-full"
                        v-if="it.isImage"
                        :src="it.path || it.temporaryPath"
                        :preview-src-list="[it.path]"
                        show-progress
                        :initial-index="4"
                        fit="cover"
                    />
                    <div class="uploadFolder w-full h-full" v-else @click="windowOpen(it.path || it.temporaryPath)">
                        <el-icon class="text-[28px]"><Folder /></el-icon>
                        <div class="w-full text-center text-[12px] line-clamp-2 leading-[12px] mt-1 px-0.5">{{ getFileName(it.file || it.path) }}</div>
                    </div>
                </div>
                <div class="progress" v-if="it.status === 0 && it.progress < 100">
                    <el-progress type="circle" :percentage="it.progress || 0" :width="(size / 2)" :stroke-width="3" />
                </div>
            </template>
            <div class="close" @click="removeFile(index)">
                <el-button circle size="small" plain>
                    <el-icon><Close /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="uploadContanier" v-if="!disabled">
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
            <label :for="uuid" class="label" v-else>
                <el-icon><Plus /></el-icon>
            </label>
        </div>
    </div>
</template>

<style scoped lang="scss">
.formkit-module-upload {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
    .uploadPrepare {
        position: relative;
        width: v-bind("`${size}px`");
        height: v-bind("`${size}px`");
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
            width: v-bind("`${size}px`");
            height: v-bind("`${size}px`");
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
    }
    input[type="file"]{ display: none }
}
</style>