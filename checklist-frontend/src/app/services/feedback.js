import api from './api';

export async function registerFeedback(feedback) {
  return await api.post('/feedback/register', feedback);
}