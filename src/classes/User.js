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
    filterToCookByTag(tag) {
        return this.recipesToCook.filter((recipe) => {
            return recipe.tags.includes(tag)
        })
    }

}

export default User;
