import { expect } from 'chai'
import Recipe from '../src/classes/Recipe'
import { sampleIngredientsData, sampleUsersData, sampleRecipeData } from '../src/data/sample-data'

describe('Recipe', () => {
  sampleIngredientsData
  sampleUsersData
  sampleRecipeData
  let recipe1
  let recipe2

  beforeEach(() => {
    recipe1 = new Recipe(sampleRecipeData[0])
    recipe2 = new Recipe(sampleRecipeData[1])
    sampleUsersData
    sampleRecipeData
  })

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function')
  })
  it('should hold property of id', () => {
    expect(recipe1.id).to.equal(595736)
    expect(recipe2.id).to.equal(678353)
  })
  it("should hold property of image", () => {
    expect(recipe1.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg")
    expect(recipe2.image).to.equal("https://spoonacular.com/recipeImages/678353-556x370.jpg")
  })
  it("should hold property of ingredients", () => {
    expect(recipe1.ingredients).to.deep.equal([{"id": 20081, "quantity": {"amount": 1.5, "unit": "c"}}, {"id": 18372, "quantity": {"amount": 0.5, "unit": "tsp"}}, {"id": 1123, "quantity": {"amount": 1, "unit": "large"}},{"id": 19335,"quantity": {"amount": 0.5,"unit": "c"}}])
    expect(recipe2.ingredients).to.deep.equal([{"id": 1009016,"quantity": {"amount": 1.5,"unit": "cups"}},{"id": 20027,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 1002046,"quantity": {"amount": 1,"unit": "tablespoon"}},{"id": 11215,"quantity": {"amount": 1,"unit": "clove"}}])
  })
  it("should hold property of instructions", () => {
    expect(recipe1.instructions).to.deep.equal([{"instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.","number": 1}, {"instruction": "Add egg and vanilla and mix until combined.", "number": 2}])
    expect(recipe2.instructions).to.deep.equal([{"instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!","number": 1}])
  })
  it("should hold property of name", () => {
    expect(recipe1.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups")
    expect(recipe2.name).to.equal("Maple Dijon Apple Cider Grilled Pork Chops")
  })
  it("should hold property of tags", () => {
    expect(recipe1.tags).to.deep.equal(["antipasti","starter","snack","appetizer","antipasto","hor d'oeuvre"])
    expect(recipe2.tags).to.deep.equal(["lunch","main course","main dish","dinner"])
  })
  it("should hold property of ingredient list", () => {
    expect(recipe1.ingredientsList).to.deep.equal([])
    expect(recipe2.ingredientsList).to.deep.equal([])
  })
  it("determine the names of ingredients needed", () => {
    expect(recipe1.determineIngredients(sampleIngredientsData)).to.deep.equal([{ingredient: "1.50 c wheat flour"}, {ingredient: "0.50 tsp bicarbonate of soda"}, {ingredient: "1.00 large eggs" }, {ingredient: "0.50 c sucrose"}])
    expect(recipe2.determineIngredients(sampleIngredientsData)).to.deep.equal([{ingredient: "1.50 cups apple cider"}, {ingredient: "1.00 tablespoon corn starch"}, {ingredient: "1.00 tablespoon dijon style mustard"}, {ingredient: "1.00 clove whole garlic clove"}])
  })
  it("should hold property of total cost", () => {
    expect(recipe1.totalCost).to.equal(undefined)
    expect(recipe2.totalCost).to.equal(undefined)
  })
  it('should calculate the cost of its ingredients', () => {
    expect(recipe1.calculateCost(sampleIngredientsData)).to.equal(14.27)
    expect(recipe2.calculateCost(sampleIngredientsData)).to.equal(17.77)
  })
  it('should be able to return its instructions', () => {
    expect(recipe1.getInstructions()).to.deep.equal(["1. In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.", "2. Add egg and vanilla and mix until combined."])
  })
  it('should be able to return different instructions', () => {
    expect(recipe2.getInstructions()).to.deep.equal(["1. Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!"])
  })
})
