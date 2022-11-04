import { addOrRemoveToPantry } from "./scripts"

export const getData = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log('Fetch Error: ', err)) 
}

export const postData = (url, addedItemsInfo) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(addedItemsInfo),
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => {
    console.log(response.status)
    if(!response.ok) {
      throw new Error(`Sorry, something went wrong`)
    }
    return response.json()
  })
  .then(test => {
   // console.log(test.status)
    console.log("test", test)
    //addOrRemoveToPantry(test)
  })
  .catch(err => console.log('Fetch Error: ', err)) 

  }
