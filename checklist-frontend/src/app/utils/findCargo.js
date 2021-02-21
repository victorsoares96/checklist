export default function findCargo(unityArray, cargoID) {
  let result;
  unityArray.forEach(unity => {
    unity.setores.forEach(sector => {
      sector.cargos.find(cargo => {
        if(cargo._id === cargoID) {
          result = cargo.nome;
        }
      })
    })
  });
  return result || 'Sem cargo';
}