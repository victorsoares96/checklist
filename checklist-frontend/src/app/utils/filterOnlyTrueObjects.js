export default function filterOnlyTrueObjects(object) {
  return Object.keys(object)
  .reduce((o, key) => {
    object[key] === true && (o[key] = object[key]);

    return o;
  }, {});
}