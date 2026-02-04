import { getConfigure } from '@/config'
import type { UploadRequester } from 'types/formkit-types'

type UploadProgressListener = (percentage: number) => void;
type UploadCompletedListener = (response: any) => void;
type UploadErrorListener = (error: any) => void;

class FileUploader {
  private onProgress: UploadProgressListener
  private onComplete: UploadCompletedListener
  private onError: UploadErrorListener
  private requester?: UploadRequester | null

  constructor(requester?: UploadRequester | null) {
    this.onProgress = () => {}
    this.onComplete = () => {}
    this.onError = () => {}

    this.requester = typeof window !== 'undefined' ? getConfigure('upload') || requester : null;

    if (!this.requester && typeof window !== 'undefined') {
      throw new Error('[FileUploader] Upload requester is not configured. Please provide a requester or configure it globally.')
    }
  }

  setProgressListener(listener: UploadProgressListener): void {
    this.onProgress = listener
  }

  setCompleteListener(listener: UploadCompletedListener): void {
    this.onComplete = listener
  }

  setErrorListener(listener: UploadErrorListener): void {
    this.onError = listener
  }

  isValidFileType(file: File, typePatterns: string): boolean {
    const Types = typePatterns.split(', ') || []
    return Types.some((pattern: string) => (new RegExp(pattern)).test(file.type))
  }

  async action(file: File): Promise<void> {
    try {
      if (!this.requester) {
        this.onError('Upload requester not configured. Call setConfigure(\'upload\', uploader) first.')
        return
      }

      const response = await this.requester(file, {
        onProgress: (progress) => {
          if (progress.total > 0) {
            const percentage = Math.round((progress.loaded / progress.total) * 100);
            this.onProgress(percentage);
          }
        }
      })

      this.onComplete(response)
    } catch (error) { this.onError(error) }
  }

  destroy() {
    this.onProgress = () => {}
    this.onComplete = () => {}
    this.onError = () => {}
  }
}

export type FileUploaderTypes = {
  action: (file: File, typePatterns?: string[]) => void;
  setProgressListener: (listener: (percentage: number) => void) => void;
  setCompleteListener: (listener: (response: any) => void) => void;
  setErrorListener: (listener: (error: any) => void) => void;
}

export default FileUploader