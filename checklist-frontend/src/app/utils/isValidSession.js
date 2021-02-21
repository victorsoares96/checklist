import * as user from '../services/admin';

/* 
  Verifica se o cadastro do usuário gravado no local storage existe
  se existir, ele retorna true se não, retorna false
 */
export default async function isValidSession(userID) {
  //const userStorage = JSON.parse(localStorage.getItem('@authApp: user'));
  //console.log(userStorage);
  try {
    const response = await user.getUserByID(userID); 
    if(response.data) return true;
  } catch (error) {
    return false;
  }
}