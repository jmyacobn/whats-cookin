class Pantry {
  constructor(pantryData) {
    this.pantryData = pantryData;
    this.ingredientsNeeded = [];
  }
  checkPantryForIngredients(recipe) {
      // console.log("recipe: ", recipe.ingredients)
      // console.log("pantry data: ", this.pantryData)
      this.pantryData.reduce((acc, pantryItem) => {
        recipe.ingredients.forEach(recipeIngredient => {
          if(!pantryItem.ingredient.includes(recipeIngredient.id) || recipeIngredient.quantity.amount < pantryItem.amount) {
             acc.push({missingIngredient: recipeIngredient.id, quantityNeeded: (recipeIngredient.quantity.amount - pantryItem.amount)})
          }
        })
        return acc = this.ingredientsNeeded
      }, [])
    return this.ingredientsNeeded
  }
}
  export default Pantry

// Determine whether a user’s pantry has enough ingredients to cook a given recipe.
// Determine the amount of missing ingredients still needed to cook a given recipe, based on what’s in the user’s pantry.
