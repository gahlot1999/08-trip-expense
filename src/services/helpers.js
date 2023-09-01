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
