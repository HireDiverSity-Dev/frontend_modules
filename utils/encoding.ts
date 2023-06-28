function base64ToFile(base64Data: string, filename: string, contentType = 'image/png') {
  const byteString = atob(base64Data.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: contentType });
  const file = new File([blob], filename, { type: contentType });

  return file;
}

export { base64ToFile };
