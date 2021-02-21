import axios from 'axios';

async function getLocationByCEP(cep) {
  const response = await axios.get(`https://api.postmon.com.br/v1/cep/${cep}`);
  return response.data;
}

export default getLocationByCEP;