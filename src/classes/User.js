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
    removeRecipesToCook(recipe) {
        this.recipesToCook.splice(recipe, 1)
        return this.recipesToCook
    }
}

export default User;
