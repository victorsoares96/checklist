import api from './api';

export async function listUnities() {
  return await api.get('/unity/list');
}

export async function listCargos(unityID, sectorID) {
  return await api.get(`/unity/list/cargos/${unityID}`, sectorID);
}

export async function getSectorByID(unityID, sectorID) {
  return await api.get(`/unity/search/${unityID}/sector/${sectorID}`);
}

export async function getCargoByID(unityID, sectorID, cargoID) {
  return await api.get(`/unity/search/${unityID}/sector/${sectorID}/cargo/${cargoID}`);
}

export async function getUnityByID(unityID) {
  return await api.get(`/unity/search/${unityID}`);
}

export async function getUnitySectorsByID(unityID) {
  return await api.get(`/unity/search/sectors/${unityID}`);
}

export async function createUnity(newUnity) {
  return await api.post('/unity/register', newUnity);
}

export async function updateUnityByID(userID, updatedUnity) {
  return await api.put(`/unity/update/${userID}`, updatedUnity);
}

export async function deleteUnityByID(userID) {
  return await api.delete(`/unity/delete/${userID}`);
}