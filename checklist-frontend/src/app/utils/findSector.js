export default function findSector(unityArray, sectorID) {
  let result;
  unityArray.forEach(unity => {
    unity.setores.find(sector => {
      if(sector._id === sectorID) {
        result = sector.nome;
      }
    })
  });
  return result || 'Sem setor';
}