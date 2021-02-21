import api from './api';

export async function getAllUsers(cancelToken) {
  return await api.get('/user/search/all', { cancelToken: cancelToken });
}

export async function getUserByID(id) {
  return await api.get(`/user/search/${id}`);
}

export async function createUser(newUser) {
  return await api.post('/user/register', newUser);
}

export async function updateUserByID(id, updatedData) {
  return await api.put(`/user/update/${id}`, updatedData);
}

export async function resetPasswordUserByID(id, newPassword) {
  return await api.post(`/user/reset_password/${id}`, { password: newPassword });
}

export async function deleteUserByID(userID) {
  return await api.delete(`/user/delete/${userID}`);
}