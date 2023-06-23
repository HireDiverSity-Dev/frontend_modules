export function getFileType(file: File): 'image' | 'pdf' | 'other' {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const pdfExtensions = ['pdf'];

  const extension = file?.name?.split('.')?.pop()?.toLowerCase();

  if (!extension) return 'other';

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (pdfExtensions.includes(extension)) {
    return 'pdf';
  } else {
    return 'other';
  }
}
