export default function isMoreThan24Hours(yourDate) {
  const now = Date.now();
  const diffInHours = Math.abs(now - yourDate) / 36e5;
  console.log(diffInHours)
  if(diffInHours > 24) return true;
  else if(diffInHours <= 24) return false;
  return 'error'
}