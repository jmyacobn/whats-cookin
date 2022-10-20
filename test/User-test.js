import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';
import User from '../src/classes/User';
import { sampleIngredientsData, sampleUsersData, sampleRecipeData } from '../src/data/sample-data';

describe('User', () => {
  sampleIngredientsData
  sampleUsersData
  sampleRecipeData
  let recipe1, recipe2, user, recipeRepo


  beforeEach(() => {
    // recipe = new Recipe({"id": 595736,"image": "https://spoonacular.com/recipeImages/595736-556x370.jpg","ingredients": [{"id": 20081,"quantity": {"amount": 1.5,"unit": "c"}},{"id": 18372, "quantity": {"amount": 0.5,"unit": "tsp"} }, {   "id": 1123,  "quantity": {    "amount": 1,    "unit": "large"  }},{"id": 19335,"quantity": {"amount": 0.5,"unit": "c"}},],"instructions": [{"instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.","number": 1},{"instruction": "Add egg and vanilla and mix until combined.","number": 2}],"name": "Loaded Chocolate Chip Pudding Cookie Cups","tags": ["antipasti","starter","snack","appetizer","antipasto","hor d'oeuvre"]});
    user = new User({"name": "Saige O'Kon","id": 1,"pantry": [{"ingredient": 11297,"amount": 4},{"ingredient": 1082047,"amount": 10},{"ingredient": 20081,"amount": 5},{"ingredient": 11215,"amount": 5},{"ingredient": 2047,"amount": 6},{"ingredient": 1123,"amount": 8},{"ingredient": 11282,"amount": 4},{"ingredient": 6172,"amount": 2},{"ingredient": 2044,"amount": 2},{"ingredient": 2050,"amount": 4},{"ingredient": 1032009,"amount": 3},{"ingredient": 5114,"amount": 3},{"ingredient": 1017,"amount": 2},{"ingredient": 18371,"amount": 7},{"ingredient": 1001,"amount": 6},{"ingredient": 99223,"amount": 2},{"ingredient": 1230,"amount": 2},{"ingredient": 9152,"amount": 4},{"ingredient": 10611282,"amount": 2},{"ingredient": 93607,"amount": 2},{"ingredient": 14106,"amount": 4},{"ingredient": 1077,"amount": 4},{"ingredient": 6150,"amount": 2},{"ingredient": 1124,"amount": 2},{"ingredient": 10011693,"amount": 4},{"ingredient": 1102047,"amount": 2},{"ingredient": 19206,"amount": 2},{"ingredient": 1145,"amount": 4},{"ingredient": 1002030,"amount": 4},{"ingredient": 12061,"amount": 2},{"ingredient": 19335,"amount": 4},{"ingredient": 15152,"amount": 3},{"ingredient": 9003,"amount": 2},{"ingredient": 18372,"amount": 3},{"ingredient": 2027,"amount": 2}]})
    recipe1 = new Recipe({"id": 595736, "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg","ingredients": [{"id": 20081,"quantity": {"amount": 1.5,"unit": "c"}},{"id": 18372, "quantity": {"amount": 0.5,"unit": "tsp"} }, {   "id": 1123,  "quantity": {    "amount": 1,    "unit": "large"  }},{"id": 19335,"quantity": {"amount": 0.5,"unit": "c"}},],"instructions": [{"instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.","number": 1},{"instruction": "Add egg and vanilla and mix until combined.","number": 2}],"name": "Loaded Chocolate Chip Pudding Cookie Cups","tags": ["antipasti","starter","snack","appetizer","antipasto","hor d'oeuvre"]});
    recipe2 = new Recipe({"id": 678353, "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg","ingredients": [{"id": 1009016,"quantity": {"amount": 1.5,"unit": "cups"}},{"id": 9003,"quantity": {"amount": 2,"unit": ""}},{"id": 20027,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 1002046,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 11215,"quantity": {"amount": 1,"unit": "clove"}},{"id": 1012046,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 19911,"quantity": {"amount": 0.25,"unit": "cup"}},{"id": 16112,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 10010062,"quantity": {"amount": 24,"unit": "ounce"}},{"id": 1102047,"quantity": {"amount": 4,"unit": "servings"}},{"id": 16124,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 1016168,"quantity": {"amount": 1,"unit": "tablespoon"}}],"instructions": [{"instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!","number": 1}],"name": "Maple Dijon Apple Cider Grilled Pork Chops","tags": ["lunch","main course","main dish","dinner"]});
    recipeRepo = new RecipeRepository(sampleRecipeData);
    sampleIngredientsData;
    sampleUsersData;
    sampleRecipeData;
  });

  it('should have a name property', () => {
    expect(user.name).to.equal("Saige O'Kon");
  });
  it('should have an id property', () => {
    expect(user.id).to.equal(1)
  });
  it('should have a list of ingredients in pantry', () => {
    expect(user.pantry).to.deep.equal([{"ingredient": 11297,"amount": 4},{"ingredient": 1082047,"amount": 10},{"ingredient": 20081,"amount": 5},{"ingredient": 11215,"amount": 5},{"ingredient": 2047,"amount": 6},{"ingredient": 1123,"amount": 8},{"ingredient": 11282,"amount": 4},{"ingredient": 6172,"amount": 2},{"ingredient": 2044,"amount": 2},{"ingredient": 2050,"amount": 4},{"ingredient": 1032009,"amount": 3},{"ingredient": 5114,"amount": 3},{"ingredient": 1017,"amount": 2},{"ingredient": 18371,"amount": 7},{"ingredient": 1001,"amount": 6},{"ingredient": 99223,"amount": 2},{"ingredient": 1230,"amount": 2},{"ingredient": 9152,"amount": 4},{"ingredient": 10611282,"amount": 2},{"ingredient": 93607,"amount": 2},{"ingredient": 14106,"amount": 4},{"ingredient": 1077,"amount": 4},{"ingredient": 6150,"amount": 2},{"ingredient": 1124,"amount": 2},{"ingredient": 10011693,"amount": 4},{"ingredient": 1102047,"amount": 2},{"ingredient": 19206,"amount": 2},{"ingredient": 1145,"amount": 4},{"ingredient": 1002030,"amount": 4},{"ingredient": 12061,"amount": 2},{"ingredient": 19335,"amount": 4},{"ingredient": 15152,"amount": 3},{"ingredient": 9003,"amount": 2},{"ingredient": 18372,"amount": 3},{"ingredient": 2027,"amount": 2}])
  });
  it('should have a list of recipes to cook', () => {
    expect(user.recipesToCook).to.deep.equal([])
  });
  it('should have a method to add recipes to cook', () => {
    user.addRecipesToCook(recipe1)
    expect(user.recipesToCook).to.deep.equal([recipe1])
    user.addRecipesToCook(recipe2)
    expect(user.recipesToCook).to.deep.equal([recipe1, recipe2])
  });
  it('should have a method to remove recipes to cook', () => {
    user.addRecipesToCook(recipe1)
    expect(user.recipesToCook).to.deep.equal([recipe1])
    user.removeRecipesToCook(recipe1)
    expect(user.recipesToCook).to.deep.equal([])

    user.addRecipesToCook(recipe1)
    user.addRecipesToCook(recipe2)
    expect(user.recipesToCook).to.deep.equal([recipe1, recipe2])
    user.removeRecipesToCook(recipe2)
    expect(user.recipesToCook).to.deep.equal([recipe1])
    // user.removeRecipesToCook(recipe1)
    // expect(user.recipesToCook).to.deep.equal([])
  })
});

// Create classes and methods that can:

// Allow a user to add/remove a recipe to their recipesToCook list (add to my recipesToCook)
// Filter my recipesToCook by a tag. (Extension option: filter by multiple tags)
// Filter my recipesToCook by its name. (Extension option: filter by name or ingredients)