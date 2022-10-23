// Your fetch requests will live here!
function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))
}
export default getData

console.log('I will be a fetch request!')