// To check, if input field only have spaces
export function isEmpty(str) {
  return !str.trim().length;
}

// Format number to currency
export function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);

  return formattedPrice;
}

// To get random hsl color
export function randomColor() {
  const random1 = (Math.random() * 100).toFixed(2);
  const random2 = (Math.random() * 100).toFixed(2);
  const random3 = (Math.random() * 70).toFixed(2);

  return `hsl(${random1}, ${random2}%, ${random3}%)`;
}
