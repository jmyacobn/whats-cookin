// Your fetch requests will live here!

let getRecipeData = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then(response => response.json())
    .then(data => {
        return data})
    .catch(err => console.log(err))

let getIngredientsData = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
    .then(data => {return data})
    .catch(err => console.log(err))

let getUserData = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then(response => response.json())
    .then(data => {return data})
    .catch(err => console.log(err))



export {getRecipeData, getIngredientsData, getUserData}

