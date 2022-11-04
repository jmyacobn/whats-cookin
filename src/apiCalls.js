const getData = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log('Fetch Error: ', err)) 
}

export default getData