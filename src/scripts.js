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
// As a user, I should be able to filter recipes by a tag.
// As a user, I should be able to filter my toCook recipes by a tag.

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepository;
let randomUser;
let user;

// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
const allRecipes = document.querySelector("#recipeRepository");
const singleRecipe = document.querySelector("#recipe");
const filterSidebar = document.querySelector("#filterSection");
const ingredientSidebar = document.querySelector("#ingredientSection")
const userName = document.querySelector('#user-info');
const favoritesView = document.querySelector('#favorites-view');
const savedButton = document.querySelector('#saved-recipe-button');

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
allRecipes.addEventListener('click', viewRecipeDetail);
window.addEventListener('load', displayAllRecipes);
window.addEventListener('load', displayWelcomeMessage);
allRecipes.addEventListener('click', addRecipeToFavorites);
savedButton.addEventListener('click', displayFavorites);

// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~

function displayAllRecipes() {
    recipeRepository = new RecipeRepository(recipeData);
    return recipeRepository.recipes.forEach((current) => {
        displayRecipePreview(current, allRecipes)
    })
}

function viewRecipeDetail(event) {
    //GOAL: incoporate instructions and total cost into recipe details page
    const foundRecipe = recipeRepository.recipes.find((current) => {
        return current.id === findId(event);
    })

    // ${foundRecipe.instructions[i].number}. ${foundRecipe.instructions[i].instruction}
    //Create variable and do iterator here
    // Store in variable => insert that variable in p tag below where we hard coded!
    // forEach to do p tag for each instrution step

    //GOAL: display all instructions as p triangles
    //INFO: instruction method and instructions array
    //
    // console.log("instructions", foundRecipe.getInstructions())

    let instructionsArray = foundRecipe.getInstructions();
    let instructionElement = "";

    instructionsArray.forEach(curr => {
      instructionElement += "<p>" + curr + "</p>"
    })
    console.log(instructionElement)

    singleRecipe.innerHTML += `
        <img src="${foundRecipe.image}" alt="${foundRecipe.name}">
        <section class="instructions">
          <h2>${foundRecipe.name}</h2>
          ${instructionElement}
        </section>`

    // console.log("here:",foundRecipe);
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

function addRecipeToFavorites(event) {
    let clickableID = Number(event.target.parentNode.id)
    let favoriteRecipe = recipeData.filter((recipe)=>{
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
    <span id="favorite">❤️</span>
    <img src="${current.image}" alt="${current.name}">
    <div class="fullcap">
        ${current.name}
    </div>
    </div>
    `
    }

 function findId(event){
    const recipeId = Number(event.target.parentElement.id);
    hide(allRecipes);
    hide(filterSidebar);
    show(singleRecipe);
    show(ingredientSidebar);

    return recipeId;
}
