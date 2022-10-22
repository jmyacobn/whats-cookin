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
const totalCost = document.querySelector('#totalCost')
const ingredientList = document.querySelector('#ingredientList');

//********WIP
let radioButtons = document.querySelectorAll('.food-category');
let submitTagButton = document.querySelector("#submitTagButton");

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
allRecipes.addEventListener('click', viewRecipeDetail);
window.addEventListener('load', displayAllRecipes);
window.addEventListener('load', displayWelcomeMessage);
allRecipes.addEventListener('click', addRecipeToFavorites);
savedButton.addEventListener('click', displayFavorites);

//********WIP
submitTagButton.addEventListener('click', displayFilteredTag);

// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~

// As a user, I should be able to filter recipes by a tag.
//GOAL: Filters all recipies by given tag

//*********WIP
function checkTagType(){
    let messageType = "";

    radioButtons.forEach((current) => {
        if(current.checked === true){
            messageType = current.value;
        }
    })
    // console.log(messageType);
    return messageType;
}

function displayFilteredTag(){
    const tagSelected = checkTagType();
    console.log("You selected", tagSelected);

    const tagSelectedList = recipeRepository.filterTag(tagSelected)
    console.log(tagSelectedList);

    allRecipes.innerHTML = ""
    
    return tagSelectedList.forEach((current) => {
        displayRecipePreview(current, allRecipes)
    })

}



function displayAllRecipes() {
    recipeRepository = new RecipeRepository(recipeData);
    return recipeRepository.recipes.forEach((current) => {
        displayRecipePreview(current, allRecipes)
    })
}

function viewRecipeDetail(event) {
  viewRecipeInstructions(event);
  viewRecipeTotalCost(event);
  viewRecipeIngredients(event);
}

function viewRecipeIngredients(event) {
  const foundRecipe = recipeRepository.recipes.find((current) => {
      return current.id === findId(event);
  })
  console.log(foundRecipe.determineIngredients(ingredientsData));
  
  let ingredientListArray = foundRecipe.determineIngredients(ingredientsData);
  let ingredientListInfo = "";

  ingredientListArray.forEach(curr => {
    ingredientListInfo += "<li>" + curr + "</li>"
  })
  ingredientList.innerHTML += `${ingredientListInfo}`

}

function viewRecipeInstructions(event) {
    const foundRecipe = recipeRepository.recipes.find((current) => {
        return current.id === findId(event);
    })

    let instructionsArray = foundRecipe.getInstructions();
    let instructionElement = "";

    instructionsArray.forEach(curr => {
      instructionElement += "<p>" + curr + "</p>"
    })

    singleRecipe.innerHTML += `
        <img src="${foundRecipe.image}" alt="${foundRecipe.name}">
        <section class="instructions">
          <h2>${foundRecipe.name}</h2>
          ${instructionElement}
        </section>`
    return foundRecipe;
};

function viewRecipeTotalCost(event) {
    const foundRecipe = recipeRepository.recipes.find((current) => {
        return current.id === findId(event);
    })
    totalCost.innerText = `$ ${foundRecipe.calculateCost(ingredientsData)}`
  }

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
