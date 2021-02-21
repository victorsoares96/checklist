function clearStoredChecklists() {
  const user = JSON.parse(localStorage.getItem('@authApp: user'));
  const { _id: userID } = user;
  localStorage.removeItem(`@storageChecklist: ${userID}`);
}

export default clearStoredChecklists;