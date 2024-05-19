export const filesRoutes = {
  LIST_FILES: '/files',
  UPLOAD_FILES: '/upload',
  DOWNLOAD_ONE_FILE: (key: string) => `/download/${key}`,
  DOWNLOAD_ALL_FILES: '/download-all',
  PREVIEW_FILE: (key: string) => `/file/${key}`,
}
