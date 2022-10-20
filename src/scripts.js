import apiCalls from './apiCalls';
import './styles.css';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from "./classes/Recipe";
import { sampleRecipeData } from './data/sample-data';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// As a user, I should be able to view a list of all recipes.
// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepository;

// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
const allRecipes = document.querySelector("#recipeRepository");

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', displayAllRecipes);

// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~
function displayAllRecipes() {
    recipeRepository = new RecipeRepository(sampleRecipeData);
    let images = recipeRepository.recipes.map(recipe => recipe.image)
    .forEach((imageUrl) => {
        allRecipes.innerHTML += `<img src="${imageUrl}">`
    })
}