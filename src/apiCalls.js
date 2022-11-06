import { allRecipes } from './scripts'

const getData = (url) => {
  return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(`Sorry, something went wrong. ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .catch(err => {
      console.log('Fetch Error: ', err)
      allRecipes.innerHTML = `<h2>Oops, something went wrong. Try again later.</h2>`}) 
}

export default getData