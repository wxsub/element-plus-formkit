type UploadProgressListener = (percentage: number) => void;
type UploadCompletedListener = (response: any) => void;
type UploadErrorListener = (error: any) => void;

class FileUploader {
  private readonly uploadUrl: string;
  private onProgress: UploadProgressListener;
  private onComplete: UploadCompletedListener;
  private onError: UploadErrorListener;
  private xhr: XMLHttpRequest | null = null;

  constructor(uploadUrl: string = '/default/oss/upload') {
    this.uploadUrl = uploadUrl;
    this.onProgress = () => {};
    this.onComplete = () => {};
    this.onError = () => {};
  }

  setProgressListener(listener: UploadProgressListener): void {
    this.onProgress = listener;
  }

  setCompleteListener(listener: UploadCompletedListener): void {
    this.onComplete = listener;
  }

  setErrorListener(listener: UploadErrorListener): void {
    this.onError = listener;
  }

  isValidFileType(file: File, typePatterns: string): boolean {
    const Types = typePatterns.split(',') || [];
    return Types.some((pattern: string) => {
      const regexPattern = pattern.trim().replace('*', '.*');
      return new RegExp(`^${regexPattern}$`).test(file.type);
    });
  }

  async action(file: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);

      this.xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded * 100) / event.total);
          this.onProgress(percentage);
        }
      });

      this.xhr.addEventListener('load', () => {
        if (this.xhr?.status >= 200 && this.xhr.status < 300) {
          try {
            const response = JSON.parse(this.xhr.responseText);
            this.onComplete(response);
            resolve();
          } catch (e) {
            this.onComplete(this.xhr.responseText);
            resolve();
          }
        } else {
          this.handleError(this.xhr?.statusText || 'Upload failed');
          reject(new Error(this.xhr?.statusText || 'Upload failed'));
        }
      });

      this.xhr.addEventListener('error', () => {
        this.handleError('Network error');
        reject(new Error('Network error'));
      });

      this.xhr.addEventListener('abort', () => {
        this.handleError('Upload cancelled');
        reject(new Error('Upload cancelled'));
      });

      this.xhr.open('POST', this.uploadUrl);
      
      this.xhr.send(formData);
    });
  }

  private handleError(message: string) {
    console.error('Upload error:', message);
    this.onError(message);
  }

  destroy() {
    if (this.xhr) {
      this.xhr.abort();
      this.xhr = null;
    }
    this.onProgress = () => {};
    this.onComplete = () => {};
    this.onError = () => {};
  }
}

export type FileUploaderTypes = {
  action: (file: File) => Promise<void>;
  setProgressListener: (listener: (percentage: number) => void) => void;
  setCompleteListener: (listener: (response: any) => void) => void;
  setErrorListener: (listener: (error: any) => void) => void;
  destroy: () => void;
};

export default FileUploader;