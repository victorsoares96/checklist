function normalize(str) {
  return str.replace(/[^\d]/g, '');
}

export default normalize;