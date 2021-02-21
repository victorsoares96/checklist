function removeStoredChecklist(checklist) {
  const user = JSON.parse(localStorage.getItem('@authApp: user'));
  const { _id: userID } = user;
  let storedChecklist = JSON.parse(localStorage.getItem(`@storageChecklist: ${userID}`));
  const index = storedChecklist.findIndex(storageChecklist => {
    return checklist._id === storageChecklist._id;
  });
  storedChecklist.splice(index, 1);
  localStorage.setItem(`@storageChecklist: ${userID}`, JSON.stringify(storedChecklist));
}

export default removeStoredChecklist;