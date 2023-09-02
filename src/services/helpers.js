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

// Encrypt 4 digit pin
// export function encrypt(pin) {
//   const digits = String(pin).split('');
//   const num = [];

//   digits.map((el) => {
//     if (el === '9') {
//       num.push(0);
//     } else {
//       num.push(Number(el) + 1);
//     }
//   });

//   return parseInt(num.join(''), 10);
// }

// Decrypt 4 digit pin
// export function decrypt(encryptedPin) {
//   const digits = String(encryptedPin).split('');
//   const num = [];

//   digits.map((el) => {
//     if (el === '0') {
//       num.push(9);
//     } else {
//       num.push(Number(el) - 1);
//     }
//   });

//   return parseInt(num.join(''), 10);
// }
