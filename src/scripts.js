import apiCalls from './apiCalls';
import './styles.css';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from "./classes/Recipe";
import { sampleRecipeData } from './data/sample-data';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// ~~~~~~~~~~~~~~ Global Variables ~~~~~~~~~~~~~~~~~~~~
let recipeRepositoryTest = new RecipeRepository(sampleRecipeData);

// ~~~~~~~~~~~~~~ Query Selectors ~~~~~~~~~~~~~~~~~~~~
// const test = document.querySelector("#recipeRepository")

// ~~~~~~~~~~~~~~ Event Listeners ~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', doSomething)

// ~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~
function doSomething() {
    console.log("hello cat!")
}