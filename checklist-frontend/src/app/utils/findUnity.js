export default function findUnity(unityArray, unityID) {
  return unityArray.find(unity => {
    return unity._id === unityID
  }) || 'Sem unidade';
}