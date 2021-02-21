export default function isValidAttachType(type) {
  const mimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation',
    'application/x-rar-compressed',
    'application/zip',
    'application/x-zip-compressed',
    'application/x-7z-compressed',
    'image/gif',
    'image/pjpeg',
    'image/jpeg',
    'image/png',
    'image/webp',
    /*'video/x-msvideo',
    'video/mpeg',
    'video/mp4',
    'video/ogg',
    'video/webm',
    'video/3gpp',
    'video/3gpp2',*/
  ];
  return mimeTypes.includes(type);
}
