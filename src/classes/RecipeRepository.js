import Recipe from "./Recipe";

class RecipeRepository {
  constructor(recipes) {
    this.recipes = this.createRecipes(recipes);
  };
  createRecipes(recipes) {
    return recipes.map((recipeInfo) => {
      return new Recipe(recipeInfo);
    });
  };
  filterTag(tag) {
    return this.recipes.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
  };
  filterName(name) {
    return this.recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(name);
    });
  };
};

export default RecipeRepository;
