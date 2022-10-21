import apiCalls from './apiCalls';
import './styles.css';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from "./classes/Recipe";
import { sampleRecipeData } from './data/sample-data';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepository;

// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
const allRecipes = document.querySelector("#recipeRepository");
const singleRecipe = document.querySelector("#recipe");
const filterSidebar = document.querySelector("#filterSection");
const ingredientSidebar = document.querySelector("#ingredientSection")

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', displayAllRecipes);
allRecipes.addEventListener('click', viewRecipeDetail);
// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~

function displayAllRecipes() {
    recipeRepository = new RecipeRepository(sampleRecipeData);

    const recipeDisplayList = recipeRepository.recipes.reduce((acc, current) => {
        const recipeData = {};
        recipeData.imageURL = current.image;
        recipeData.name = current.name;
        acc.push(recipeData);
        recipeData.id = current.id;
        return acc;
    }, [])
    .forEach((current) => {
        allRecipes.innerHTML += `
            <div class= "fullwrap" id="${current.id}">
                <img src="${current.imageURL}" alt="${current.name}">
                <div class="fullcap"> 
                    ${current.name}
                </div>
            </div>`
    })
};

function findId(event){
    const recipeId = Number(event.target.parentElement.id);
    hide(allRecipes);
    hide(filterSidebar);
    show(singleRecipe);
    show(ingredientSidebar);

    return recipeId;
}

function viewRecipeDetail(event) {
    //GOAL: incoporate instructions and total cost into recipe details page
    const foundRecipe = recipeRepository.recipes.find((current) => {
        return current.id === findId(event);
    })

    singleRecipe.innerHTML += `
        <img src="${foundRecipe.image}" alt="${foundRecipe.name}">
        <section class="instructions">
          <h2>${foundRecipe.name}</h2>
          <p>instructionsss 1 2 3</p>
        </section>`

    console.log("here:", foundRecipe);
    return foundRecipe;
};

// ~~~~~~~ Helper Functions ~~~~~~~

function hide(element) {
    element.classList.add("hidden");
  };
   function show(element) {
    element.classList.remove("hidden");
  };