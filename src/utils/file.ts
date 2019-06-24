export default function formatFileSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const MEGA_BYTE_MULTIPLE = 1024;
  if (bytes === 0) {
    return '0 Bytes';
  }
  const i = Math.trunc(Math.floor(Math.log(bytes) / Math.log(MEGA_BYTE_MULTIPLE)));
  return `${(bytes / Math.pow(MEGA_BYTE_MULTIPLE, i)).toFixed(2)} ${sizes[i]}`;
}
