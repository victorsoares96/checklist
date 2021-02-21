export default function isValidAttachSize(size) {
  /* Verifica se o arquivo é maior que 100MB, se for ele inválida */
  if(size > 30000000) return false;
  else return true;
}