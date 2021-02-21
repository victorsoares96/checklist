export default function filterArrayObjects(array, query, column) {
  return array.filter(function(item) {
    return item[column] === query;
  });
}