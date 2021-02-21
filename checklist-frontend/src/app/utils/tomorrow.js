export default function tomorrow() {
  return new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
}