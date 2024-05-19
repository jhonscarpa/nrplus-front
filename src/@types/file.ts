export interface IPropsFile {
  Key: string
  LastModified: Date
  StorageClass: string
  typeArchive: 'pdf' | 'xlsx' | 'png' | 'jpg' | 'jpeg' | 'docx'
  Size: number
}
