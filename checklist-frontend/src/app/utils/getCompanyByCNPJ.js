import axios from 'axios';

async function getCompanyByCNPJ(cnpj) {
  const response = await axios.get(`http://www.receitaws.com.br/v1/cnpj/${cnpj}`, {    
    headers: {                  
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
      "Content-Type": "application/json;charset=UTF-8"                   
  },
  });
  return response.data;
}

export default getCompanyByCNPJ;