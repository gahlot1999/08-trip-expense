const URL = 'https://api.unsplash.com/search/photos?page=1';
const KEY = 'jWfXtpHxhEeTltQ7K9RlYbEJsu5pT5ghKNlWP4e-qhk';

export async function getLink(place) {
  // const random = Math.floor(Math.random() * 6);
  const res = await fetch(`${URL}&query=${place}&client_id=${KEY}`);
  const data = await res.json();

  return data.results[0].urls.small;
}
