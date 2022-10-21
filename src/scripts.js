import apiCalls from './apiCalls';
import './styles.css';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from "./classes/Recipe";
import User from "./classes/User";
import { sampleRecipeData, sampleUsersData } from './data/sample-data';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { use } from 'chai';
var test
// As a user, I should be able to view a list of all recipes.
// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepository;
let randomUser;
let user

console.log("HELP", sampleUsersData)
// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
const allRecipes = document.querySelector("#recipeRepository");
const userName = document.querySelector('#user-info');
const favoritesView = document.querySelector('#favorites-view');
const savedButton = document.querySelector('#saved-recipe-button');
const singleRecipe = document.querySelector('#recipe');


// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', displayAllRecipes);
window.addEventListener('load', displayWelcomeMessage);
allRecipes.addEventListener('click', addRecipeToFavorites);
savedButton.addEventListener('click', displayFavorites);

// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~

//GOAL: image URL and image name
//NEED: [{imageURL: www.abd.com, name: burrito}, 
//       {imageURL: www.abc.com, name: taco},
//       {imageURL: www.abe.com, name: burger}]

function displayAllRecipes() {
    recipeRepository = new RecipeRepository(sampleRecipeData);
    return recipeRepository.recipes.forEach((current) => {
        displayRecipePreview(current, allRecipes)
    })
}

function displayRecipePreview(current, view) {
    view.innerHTML += `
    <div class = "fullwrap" id="${current.id}">
    <span id="favorite">❤️</span>
            <img src="${current.image}" alt="${current.name}">
         <div> 
            ${current.name}
            </div>
        </div>`
    }

function randomizeUser() {
        randomUser = sampleUsersData[Math.floor(Math.random() * sampleUsersData.length)]
        user = new User(randomUser);
        return user
}

function displayWelcomeMessage() {
    randomizeUser()
    userName.innerText = `Welcome, ${randomUser.name}!`
}

function addRecipeToFavorites(event) {
    let clickableID = Number(event.target.parentNode.id)
    let favoriteRecipe = sampleRecipeData.filter((recipe)=>{
      return recipe.id === clickableID 
    })
     user.addRecipesToCook(favoriteRecipe)
    return
}

function displayFavorites() {
   hide(allRecipes);
   show(favoritesView);
   return user.recipesToCook.map((recipe) => {
    recipe.forEach((current) => {
        displayRecipePreview(current, favoritesView)
        })
    })
}

function hide(element) {
    element.classList.add("hidden");
};

function show(element) {
    element.classList.remove("hidden");
};