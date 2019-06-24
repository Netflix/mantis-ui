export default function formatFileNameFromPath(item) {
  if (!item) { return; }
  return item.substring(item.lastIndexOf('/') + 1);;
}
