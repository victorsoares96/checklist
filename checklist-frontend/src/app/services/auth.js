import api from './api';

export async function LoginService(user, password) {
  return await api.post('/user/authenticate', { user, password });
}