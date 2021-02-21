import _ from 'lodash';

function handleStorageChecklist(newChecklist) {
  const user = JSON.parse(localStorage.getItem('@authApp: user'));
  const { _id: userID } = user;
  let storedChecklist = JSON.parse(localStorage.getItem(`@storageChecklist: ${userID}`));
  
  /* Remove valores inválidos */
  storedChecklist = _.remove(storedChecklist, (item) => { return item != '' });
  
  if(!storedChecklist) {
    localStorage.setItem(`@storageChecklist: ${userID}`, JSON.stringify([newChecklist]));
  } else {
    const findChecklist = storedChecklist.find(storageChecklist => {
      return newChecklist._id === storageChecklist._id
    });

    if(findChecklist) {
      const index = storedChecklist.findIndex(storageChecklist => {
        return newChecklist._id === storageChecklist._id;
      });
      let aux = storedChecklist;
      aux[index] = {
        ...newChecklist,
        createdAt: findChecklist.createdAt
      };
      localStorage.setItem(`@storageChecklist: ${userID}`, JSON.stringify(aux));
    } else if(!findChecklist) {
      let aux = storedChecklist;
      aux.push(newChecklist);
      localStorage.setItem(`@storageChecklist: ${userID}`, JSON.stringify(aux));
    }
  }
}

export default handleStorageChecklist;