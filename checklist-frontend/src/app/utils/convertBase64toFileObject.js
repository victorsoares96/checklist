import dataURLtoFile from "./dataURLtoFile";

export default function convertBase64toFileObject(base64, filename) {
  return dataURLtoFile(base64, filename);
}