export default function getSum(array) {
  let total = 0;
  for (let index = 0; index < array.length; index++) {
    total = total + array[index];
  }
  return total;
}