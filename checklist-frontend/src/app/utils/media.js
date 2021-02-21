export default function calcularMedia(array) {
  let sum = array.reduce(function(a, b){
    return a + b;
  }, 0);
  return (isNaN((sum/array.length).toFixed(1)) ? 0 : (sum/array.length).toFixed(1));
}