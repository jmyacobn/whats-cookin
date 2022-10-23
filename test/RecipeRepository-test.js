import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import { sampleIngredientsData, sampleUsersData, sampleRecipeData } from '../src/data/sample-data';

describe('RecipeRepo', () => {
  sampleIngredientsData;
  sampleUsersData;
  sampleRecipeData;
  let recipe1, recipe2, recipeRepository;

  beforeEach(() => {
    recipe1 = new Recipe(sampleRecipeData[0]);
    recipe2 = new Recipe(sampleRecipeData[1]);
    recipeRepository = new RecipeRepository(sampleRecipeData);
    sampleIngredientsData;
    sampleUsersData;
    sampleRecipeData;
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
  it('Should have a property of recipes which holds an array of Recipe instances', () => {
    expect(recipeRepository.recipes).to.deep.equal([recipe1, recipe2]);
  });
  it('Should create recipe instances.', () => {
    expect(recipeRepository.createRecipes(sampleRecipeData)).to.deep.equal([recipe1, recipe2]);
  });
  it('Should filter a list of recipes based on a tag.', () => {
    expect(recipeRepository.filterTag("lunch")).to.deep.equal([recipe2]);
    expect(recipeRepository.filterTag("hor d'oeuvre")).to.deep.equal([recipe1]);
  });
  it('Should filter list of recipes based on its name.', () => {
    expect(recipeRepository.filterName("maple dijon apple cider grilled pork chops")).to.deep.equal([recipe2]);
    expect(recipeRepository.filterName("loaded chocolate chip pudding cookie cups")).to.deep.equal([recipe1]);
  });
});

