import apiCalls from './apiCalls';
import './styles.css';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from "./classes/Recipe";
import User from "./classes/User";
import { ingredientsData } from './data/ingredients'
import { recipeData } from './data/recipes';
import { usersData } from './data/users';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { use } from 'chai';

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepository;
let randomUser;
let user;
let foundRecipe;

// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
const allRecipes = document.querySelector("#recipeRepository");
const singleRecipe = document.querySelector("#recipe");
const filterSidebar = document.querySelector("#filterSection");
const ingredientSidebar = document.querySelector("#ingredientSection")
const userName = document.querySelector('#user-info');
const favoritesView = document.querySelector('#favorites-view');
const savedButton = document.querySelector('#saved-recipe-button');
const saveRecipeButton = document.querySelector('#favorite-recipe-button')
const homeButton = document.querySelector('#home-button')

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
allRecipes.addEventListener('click', viewRecipeDetail);
window.addEventListener('load', displayAllRecipes);
window.addEventListener('load', displayWelcomeMessage);
savedButton.addEventListener('click', displayFavorites);
saveRecipeButton.addEventListener('click', addRecipeToFavorites)
homeButton.addEventListener('click', displayHomePage)

// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~

function displayAllRecipes() {
    recipeRepository = new RecipeRepository(recipeData);
    return recipeRepository.recipes.forEach((current) => {
        displayRecipePreview(current, allRecipes)
    })
}

function viewRecipeDetail(event) {
    show(saveRecipeButton)
    hide(allRecipes);
    hide(filterSidebar);
    show(singleRecipe);
    show(ingredientSidebar);
    foundRecipe = recipeRepository.recipes.find((current) => {
        return current.id === findId(event)
    })
    singleRecipe.innerHTML = `
        <img src="${foundRecipe.image}" alt="${foundRecipe.name}">
        <section class="instructions">
          <h2>${foundRecipe.name}</h2>
          <p>${foundRecipe.getInstructions()}</p>
        </section>`
    return foundRecipe;
};

function randomizeUser() {
    randomUser = usersData[Math.floor(Math.random() * usersData.length)]
    user = new User(randomUser);
    return user
}

function displayWelcomeMessage() {
    randomizeUser()
    userName.innerText = `Welcome, ${randomUser.name}!`
}

function addRecipeToFavorites() {
    return user.addRecipesToCook(foundRecipe)
}

function displayFavorites() {
   hide(allRecipes);
   hide(singleRecipe);
   show(favoritesView);
   hide(saveRecipeButton);
   hide(savedButton);
   show(filterSidebar);
   hide(ingredientSidebar)
   user.recipesToCook.forEach((current) => {
    displayRecipePreview(current, favoritesView)
    })
}

function displayHomePage() {
    show(allRecipes);
    hide(singleRecipe);
    hide(favoritesView);
    show(saveRecipeButton);
    show(savedButton);
    show(filterSidebar);
    hide(ingredientSidebar)
}
// ~~~~~~~ Helper Functions ~~~~~~~

function hide(element) {
    element.classList.add("hidden");
  };

function show(element) {
    element.classList.remove("hidden");
  };

function displayRecipePreview(current, view) {
    view.innerHTML += `
    <div class = "fullwrap" id="${current.id}">
    <img src="${current.image}" alt="${current.name}">
    <div class="fullcap"> 
        ${current.name}
    </div>
    </div>
    `
    }
    
 function findId(event){
    return Number(event.target.parentElement.id);
}
