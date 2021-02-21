import api from './api';

export async function listChecklists() {
  return await api.get('/checklist/list');
}

export async function getChecklistByID(checklistID) {
  return await api.get(`/checklist/search/${checklistID}`);
}

export async function createChecklist(newChecklist) {
  return await api.post('/checklist/register', newChecklist);
}

export async function updateChecklistByID(userID, updatedChecklist) {
  return await api.put(`/checklist/update/${userID}`, updatedChecklist);
}

export async function deleteChecklistByID(checklistID) {
  return await api.delete(`/checklist/delete/${checklistID}`);
}

/* ------------------------------------------------------------------------------- */

export async function countAnswerChecklists(unity, checklist, beforeDate, afterDate) {
  return await api.get(`/checklist/answer/count?beforeDate=${beforeDate}&afterDate=${afterDate}&unity=${unity}&checklist=${checklist}`);
}

export async function answerChecklist(answeredChecklist) {
  return await api.post('/checklist/answer/register', answeredChecklist);
}

export async function listAnsweredChecklists(page, beforeDate, afterDate, unity, checklist, answeredBy, sortType) {
  return await api.get(`/checklist/answer/list?page=${page}&beforeDate=${beforeDate}&afterDate=${afterDate}&unity=${unity}&checklist=${checklist}&answeredBy=${answeredBy}&sortType=${sortType}`);
}

export async function getAnsweredChecklistByID(answeredChecklistID) {
  return await api.get(`/checklist/answer/search/${answeredChecklistID}`);
}

export async function deleteAnsweredChecklistByID(answeredChecklistID) {
  return await api.delete(`/checklist/answer/delete/${answeredChecklistID}`);
}

export async function sendAttachment(file) {
  return await api.post('/attachment/send', file , {
    headers: {
        "Content-type": "multipart/form-data",
    },                    
});
}