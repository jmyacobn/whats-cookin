import RecipeRepository from "./RecipeRepository";

class User {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.pantry = data.pantry;
        this.recipesToCook = [];
    }
    addRecipesToCook(recipe) {
        return this.recipesToCook.push(recipe);
    }
    removeRecipesToCook(recipeToRemove) {
      const index = this.recipesToCook.indexOf(recipeToRemove) 
       return this.recipesToCook.splice([index], 1)
    }
    filterToCookByTag(RecipeRepository, tag) {
       return this.recipesToCook[RecipeRepository.filterTag(tag)]
       
    }

}

export default User;
