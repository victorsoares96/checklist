import api from './api';

export async function generatePDF(answerChecklistID) {
  return await api.get(`/pdf/generatePDF/${answerChecklistID}`, {
    responseType: 'blob' //Force to receive data in a Blob Format
  });
}