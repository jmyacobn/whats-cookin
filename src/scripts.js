// ~~~~~~~~~~~~~~ File Imports ~~~~~~~~~~~~~~~~~~~~
import getData from './apiCalls'
import RecipeRepository from './classes/RecipeRepository'
import Ingredients from './classes/Ingredients'
import User from './classes/User'
import './styles.css'
import './images/cooking.png'
import Pantry from './classes/Pantry'

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepository
let ingredients
let randomUser
let user
let foundRecipe
let homeView = true
let apiUsers
let apiRecipes
let apiIngredients
let postItNote
let foundIt
let recipeView = false
const usersURL = 'http://localhost:3001/api/v1/users'
const recipesURL = 'http://localhost:3001/api/v1/recipes'
const ingredientsURL = 'http://localhost:3001/api/v1/ingredients'

// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
export const allRecipes = document.querySelector('#recipeRepository')
const singleRecipe = document.querySelector('#recipe')
const filterSidebar = document.querySelector('#filterSection')
const ingredientSidebar = document.querySelector('#ingredientSection')
const userName = document.querySelector('#user-info')
const favoritesView = document.querySelector('#favorites-view')
const favoriteButton = document.querySelector('#favorited-recipe-button')
const totalCost = document.querySelector('#totalCost')
const ingredientList = document.querySelector('#ingredientList')
const radioButtons = document.querySelectorAll('.food-category')
const resetButton = document.querySelector('#resetButton')
const favoriteRecipeButton = document.querySelector('#favorite-recipe-button')
const homeButton = document.querySelector('#home-button')
const searchBar = document.querySelector('#search-bar')
const submitButton = document.querySelector('#submit-search-button')
const removeRecipeButton = document.querySelector('#remove-recipe-button')
const pantryButton = document.querySelector('#pantry-button')
const pantryView = document.querySelector('#pantry-view')
const selectIngredient = document.querySelector('#ingredient-drop-down-menu')
const pantryTable = document.querySelector('#pantry-table')
const navMessage = document.querySelector('.current-view-message')
const addButton = document.querySelector('#add-button')
const inputQuantity = document.querySelector('#quantity-input')
let pantryInputs = [inputQuantity, selectIngredient]
const cookRecipeButton = document.querySelector('#cook-recipe-button')
const errorMessage = document.querySelector('#error-handling')
const cookStatusSection = document.querySelector('#can-cook-section')
const ingredientsNeededToCook = document.querySelector('#ingredients-needed')
const missingIngredientList = document.querySelector('#missing-ingredient-list')
const cookMessage = document.querySelector('#cook-message')

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', fetchData([usersURL, recipesURL, ingredientsURL]))
allRecipes.addEventListener('click', findRecipeOnClick)
allRecipes.addEventListener('keypress', findRecipeOnTab)
homeButton.addEventListener('click', displayHomePage)
favoritesView.addEventListener('click', findRecipeOnClick)
favoritesView.addEventListener('keypress', findRecipeOnTab)
resetButton.addEventListener('click', resetFilter)
favoriteRecipeButton.addEventListener('click', addRecipeToFavorites)
removeRecipeButton.addEventListener('click', removeRecipeFromFavorites)
favoriteButton.addEventListener('click', displayFavoritesPage)
pantryButton.addEventListener('click', displayPantryPage)
addButton.addEventListener('click', () => {
    addButton.disabled = true
    addItemToPantry()
})
cookRecipeButton.addEventListener('click', cookRecipe)
pantryInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(inputQuantity.value !== '' && selectIngredient.value !== 'Choose Ingredient') {
            addButton.disabled = false
        } else {
            addButton.disabled = true
        }
    })
})
inputQuantity.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault()
        addItemToPantry()
    }
})
searchBar.addEventListener('input', () => {
    if(searchBar.value !== '') {
        submitButton.disabled = false
    } else {
        submitButton.disabled = true
    }
})
searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && homeView) {
        event.preventDefault()
        searchHomeRecipeByName()
    } else if (event.key === 'Enter' && !homeView) {
        event.preventDefault()
        searchFavoriteRecipeByName()
    }
})
submitButton.addEventListener('click', () => {
    if (homeView) {
        submitButton.disabled = true
        searchHomeRecipeByName()
    } else {
        submitButton.disabled = true
        searchFavoriteRecipeByName()
    }
})

// ~~~~~~~~~~~~~~ Setup Functions ~~~~~~~~~~~~~~~~~~~~
function fetchData(urls) {
    Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
        .then(data => {
            apiUsers = data[0]
            apiRecipes = data[1]
            apiIngredients = data[2]
            recipeRepository = new RecipeRepository(apiRecipes)
            ingredients = new Ingredients(apiIngredients)
            displayAllRecipes()
            randomizeUser(apiUsers)
        })
        .catch(err => {
            allRecipes.innerHTML = `<h2>Oops, something went wrong. Try again later.</h2>`
            console.log('Fetch Error: ', err)
        })
}

function displayAllRecipes() {
    return recipeRepository.recipes.forEach((current) => {
        displayRecipePreview(current, allRecipes)
    })
}

function randomizeUser(data) {
    randomUser = data[Math.floor(Math.random() * data.length)]
    user = new User(randomUser)
    displayWelcomeMessage(user.name)
    return user
}

// ~~~~~~~~~~~~~~ Main View Functions ~~~~~~~~~~~~~~~~~~~~
function displayHomePage() {
    allRecipes.innerHTML = ''
    navMessage.innerText = 'All Recipes'
    hide([removeRecipeButton, singleRecipe, favoritesView, favoriteRecipeButton, ingredientSidebar, pantryView, cookStatusSection, ingredientsNeededToCook])
    show([allRecipes, favoriteButton, filterSidebar, pantryButton])
    displayAllRecipes()
    homeView = true
    recipeView = false
}

function displayFavoritesPage() {
    hide([removeRecipeButton, allRecipes, singleRecipe, favoriteRecipeButton, favoriteButton, ingredientSidebar, pantryView])
    show([favoritesView, filterSidebar])
    favoritesView.innerHTML = ''
    navMessage.innerText = 'All Favorite Recipes'
    if (user.recipesToCook.length === 0) {
        favoritesView.innerHTML = `<p class='no-saved-message'>You have no saved recipes</p>`
    }
    user.recipesToCook.forEach((current) => {
        displayRecipePreview(current, favoritesView)
    })
    homeView = false
    recipeView = false
}

function displayPantryPage() {
    navMessage.innerText = 'Pantry'
    hide([removeRecipeButton, pantryButton, allRecipes, singleRecipe, favoritesView, favoriteRecipeButton, favoriteButton, ingredientSidebar, filterSidebar])
    show([pantryView, favoriteButton])
    displayIngredientDropDown()
    addOrRemoveToPantry(user)
    homeView = false
    recipeView = false
}

function displayRecipeDetailPage(event) {
    recipeView = true
    navMessage.innerText = ''
    if(!user.recipesToCook.includes(foundRecipe)) {
        show([favoriteRecipeButton])
        hide([removeRecipeButton])
    }
    else {
        hide([removeRecipeButton, favoriteRecipeButton])
        giveCookingFeedback()
    }
    displayRecipeInstructions(event)
    displayRecipeTotalCost(event)
    displayRecipeIngredients(event)
    show([favoriteButton, pantryButton])
}

function giveCookingFeedback() {
    user.pantry.checkPantryForIngredients(foundRecipe)
    user.pantry.determineIngredientsNeeded(foundRecipe)
    if(!user.pantry.userCanCook) {
        displayMissingIngr()
        hide([cookRecipeButton, favoriteRecipeButton])
        show([cookStatusSection, ingredientsNeededToCook, removeRecipeButton, favoriteButton])
    }
    else if(user.pantry.userCanCook) {
        show([cookRecipeButton, favoriteButton])
        hide([ingredientsNeededToCook, cookStatusSection, favoriteRecipeButton])
    }
}

function displayMissingIngr() {
    missingIngredientList.innerHTML = ''
    return user.pantry.ingredientsNeeded.map((ingredientNeed) => {
        let ingredientName = ingredients.ingredients.reduce((name, ingredient) => {
            if (ingredientNeed.missingIngredient === ingredient.id) {
                name = ingredient.name
            }
            return name
        }, '')
        return { name: ingredientName, quantity: ingredientNeed.quantityNeeded, unit: ingredientNeed.units }
    }).forEach((missing) => {
        missingIngredientList.innerHTML += `<li>${missing.quantity.toFixed(2)} ${missing.unit.toLowerCase()} ${missing.name}</li>`
    })
}

function displayRecipeInstructions() {
    let instructionsArray = foundRecipe.getInstructions()
    let instructionElement = ''
    hide([favoritesView, allRecipes, filterSidebar])
    show([singleRecipe, ingredientSidebar])
    instructionsArray.forEach(curr => {
        instructionElement += '<p>' + curr + '</p>'
    })
    singleRecipe.innerHTML = `
        <img src='${foundRecipe.image}' alt='${foundRecipe.name}'>
        <section class='instructions'>
          <h2>${foundRecipe.name}</h2>
          ${instructionElement}
        </section>`
    return foundRecipe
}

// ~~~~~~~~~~~~~~ Sidebar View Functions ~~~~~~~~~~~~~~~~~~~~
function displayRecipeIngredients() {
    let listOfIngredients = foundRecipe.determineIngredients(ingredients.ingredients)
    ingredientList.innerHTML = ''
    listOfIngredients.forEach((item) => {
        ingredientList.innerHTML += `<li>${item.ingredient}</li>`
    })
}

function displayRecipeTotalCost() {
    totalCost.innerText = `$ ${foundRecipe.calculateCost(ingredients.ingredients)}`
}

// ~~~~~~~~~~~~~~ Filter Functions ~~~~~~~~~~~~~~~~~~~~
radioButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (homeView) {
            allRecipes.innerHTML = ''
            navMessage.innerText = capitalizeFirstLetter(button.value) + ' Recipes'
            recipeRepository.filterTag(button.value).forEach(current => {
                displayRecipePreview(current, allRecipes)
            })
        }
        else if (!homeView && user.filterToCookByTag(button.value).length > 0) {
            favoritesView.innerHTML = ''
            navMessage.innerText = 'All Favorite ' + capitalizeFirstLetter(button.value) + ' Recipes'
            user.filterToCookByTag(button.value).forEach(current => {
                displayRecipePreview(current, favoritesView)
            })
        }
        else {
            navMessage.innerText = 'Oops!'
            favoritesView.innerHTML = `<p class='unfound-recipe-message'>No recipe found. Please search by name or category to filter recipes.</p>`
        }
    })
})

function resetFilter() {
    radioButtons.forEach(button => {
        button.checked = false
    })
    if (homeView) {
        allRecipes.innerHTML = ''
        navMessage.innerText = 'All Recipes'
        displayAllRecipes()
    }
    else {
        favoritesView.innerHTML = ''
        navMessage.innerText = 'All Favorite Recipes'
        displayFavoritesPage()
    }
}

function searchHomeRecipeByName() {
    allRecipes.innerHTML = ''
    let filteredList = []
    const filtersByNameList = recipeRepository.filterName(searchBar.value.toLowerCase())
    const filtersByTagList = recipeRepository.filterTag(searchBar.value.toLowerCase())
    if (filtersByNameList.length > 0 && searchBar.value != '') {
        navMessage.innerText = `Search Results: "${capitalizeFirstLetter(searchBar.value)}"`
        filteredList = filtersByNameList
        filteredList.forEach((currentRecipe) => {
            displayRecipePreview(currentRecipe, allRecipes)
        })
    }
    else if (filtersByTagList.length > 0 && searchBar.value != '') {
        navMessage.innerText = `Search Results: "${capitalizeFirstLetter(searchBar.value)}"`
        filteredList = filtersByTagList
        filteredList.forEach((currentRecipe) => {
            displayRecipePreview(currentRecipe, allRecipes)
        })
    }
    else {
        navMessage.innerText = 'Oops!'
        allRecipes.innerHTML = `<p class='unfound-recipe-message'>No recipe found. Please search by name or category to filter recipes.</p>`
    }
    searchBar.value = ''
}

function searchFavoriteRecipeByName() {
    favoritesView.innerHTML = ''
    let filteredList = []
    const filtersByNameList = user.filterToCookByName(searchBar.value.toLowerCase())
    const filtersByTagList = user.filterToCookByTag(searchBar.value.toLowerCase())
    if (filtersByNameList.length > 0 && searchBar.value != '') {
        navMessage.innerText = 'All Favorite ' + capitalizeFirstLetter(searchBar.value) + ' Recipes'
        filteredList = filtersByNameList
        filteredList.forEach((currentRecipe) => {
            displayRecipePreview(currentRecipe, favoritesView)
        })
    }
    else if (filtersByTagList.length > 0 && searchBar.value != '') {
        navMessage.innerText = 'All Favorite ' + capitalizeFirstLetter(searchBar.value) + ' Recipes'
        filteredList = filtersByTagList
        filteredList.forEach((currentRecipe) => {
            displayRecipePreview(currentRecipe, favoritesView)
        })
    }
    else {
        navMessage.innerText = 'Oops!'
        favoritesView.innerHTML = `<p class='unfound-recipe-message'>No recipe found. Please search by name or category to filter recipes.</p>`
    }
    searchBar.value = ''
}

// ~~~~~~~~~~~~~~ Add/Delete Functions ~~~~~~~~~~~~~~~~~~~~
function addRecipeToFavorites() {
    hide([favoriteRecipeButton])
    navMessage.innerText = 'This recipe has been added to favorites!'
    setTimeout(fadeOutNavMessage, 2000)
    return user.addRecipesToCook(foundRecipe)
}

function removeRecipeFromFavorites() {
    if (user.recipesToCook.includes(foundRecipe)) {
        user.removeRecipesToCook(foundRecipe)
        resetView()
    }
}

// ~~~~~~~~~~~~~~ Helper Functions ~~~~~~~~~~~~~~~~~~~~
function findRecipeOnClick(event) {
    foundRecipe = recipeRepository.recipes.find((current) => {
        return current.id === Number(event.target.parentElement.id)
    })
    displayRecipeDetailPage(event)
}

function findRecipeOnTab(event){
    if(event.key === ' '   || event.key === 'Enter'){
        event.preventDefault()
        foundRecipe = recipeRepository.recipes.find((current) => {
            return current.id === Number(event.target.id)
        })
        displayRecipeDetailPage(event)
    }
}

function displayRecipePreview(current, view) {
    view.innerHTML += `
    <figure class = 'fullwrap' id='${current.id}' tabindex='0'>
    <img src='${current.image}' alt='${current.name}'>
    <figcaption class='fullcap'>
        ${current.name}
    </figcaption>
    </figure>
    `
}

function displayWelcomeMessage(user) {
    userName.innerText = `Welcome, ${user}!`
}

function resetView() {
    if (user.recipesToCook.length > 0) {
        displayFavoritesPage()
    }
    else {
        displayHomePage()
    }
}

function hide(elementList) {
    elementList.forEach((currentElement) => {
        currentElement.classList.add('hidden')
    })
}

function show(elementList) {
    elementList.forEach((currentElement) => {
        currentElement.classList.remove('hidden')
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function displayIngredientDropDown() {
    const sortedIngredients = apiIngredients.sort((a, b) => a.name.localeCompare(b.name))
    selectIngredient.innerHTML = ''
    selectIngredient.innerHTML = `<option value='Choose Ingredient'>Choose Ingredient...</option>`
    sortedIngredients.forEach(ingredient => {
        selectIngredient.innerHTML += `
        <option value='${ingredient.name}'>${ingredient.name}</option>`
    })
}

function addOrRemoveToPantry() {
    pantryTable.innerHTML = ''
    const amount = apiIngredients.reduce((acc, value) => {
        user.pantry.pantryData.forEach(current => {
            if (value.id === current.ingredient) {
                let pantryItem = { ['Ingredient']: value.name, ['Amount']: current.amount }
                acc.push(pantryItem)
            }
        })
        return acc
    }, []).forEach(value => {
        pantryTable.innerHTML += `
            <data class='boxI'>${value.Ingredient}</data>
            <data class='boxA'>${value.Amount}</data>
            `
    })
    return amount
}

function getIngredientID() {
    foundIt = ingredients.ingredients.reduce((acc, element) => {
        if (element.name === selectIngredient.value) {
            acc = element.id
        }
        return acc
    }, 0)
    return foundIt
}

function getPostVariable() {
    postItNote = { userID: user.id, ingredientID: foundIt, ingredientModification: Number(inputQuantity.value) }
    return postItNote
}

function updatePantry(postData) {
    return fetch(usersURL, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Sorry, something went wrong. ${response.status}: ${response.statusText}`)
            }
            return response.json()
        })
        .then(test =>
            getData(usersURL))
        .then(data => {
            updateUser(data)
            addOrRemoveToPantry()
            displayMissingIngr()
        })
        .catch(err => {
            console.log('Fetch Error: ', err)
            errorMessage.innerHTML = `Oops, something went wrong. Try again later.`
        })
}

function updateUser(param) {
    const updatedUser = param.find((updatedUser) => {
        return user.id === updatedUser.id
    })
    user.pantry = new Pantry(updatedUser.pantry)
}

function addItemToPantry() {
    getIngredientID()
    updatePantry(getPostVariable())
    displayIngredientDropDown()
    inputQuantity.value = ''
    inputQuantity.placeholder = 'quantity'
}

function fadeOutNavMessage() {
    if (recipeView) {
        navMessage.classList.add('fade-out')
        setTimeout(resetNavMessageAfterFade, 500)
    }
}

function resetNavMessageAfterFade() {
    if (recipeView) {
        navMessage.innerText = ''
    }
    navMessage.classList.remove('fade-out')
}

function removeIngredientsFromPantry() {
    const items = foundRecipe.ingredients.reduce((acc, value) => {
        const itemRemoved = { userID: user.id, ingredientID: value.id, ingredientModification: -Number(value.quantity.amount) }
        acc.push(itemRemoved)
        return acc
    }, [])
    return items
}

function cookRecipe() {
    removeIngredientsFromPantry().forEach(element => {
        updatePantry(element)
    })
    hide([cookRecipeButton])
    show([cookMessage])
    setTimeout( () => {
        hide([cookMessage])
    }, 4000)
    user.removeRecipesToCook(foundRecipe)
}
