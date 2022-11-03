import { expect } from 'chai'
import Pantry from '../src/classes/Pantry'
import User from '../src/classes/User'
import Recipe from '../src/classes/Recipe'
import { sampleIngredientsData, sampleUsersData, sampleRecipeData } from '../src/data/sample-data'

describe('Pantry', () => {
    sampleIngredientsData
    sampleUsersData
    sampleRecipeData
    let recipe1, recipe2, user1, user2

beforeEach(() => {
    user1 = new User(sampleUsersData[0])
    user2 = new User(sampleUsersData[1])
    recipe1 = new Recipe(sampleRecipeData[0])
    recipe2 = new Recipe(sampleRecipeData[1])
    sampleIngredientsData
    sampleUsersData
    sampleRecipeData
  })

  it('should be a function', () => {
    expect(Pantry).to.be.a('function')
  })
  it('should hold property pantry data', () => {
    expect(user1.pantry.pantryData).to.equal(sampleUsersData[0].pantry)
    expect(user2.pantry.pantryData).to.equal(sampleUsersData[1].pantry)
  })
  it('should hold property to store ingredients needed', () => {
    expect(user1.pantry.ingredientsNeeded).to.deep.equal([])
    expect(user2.pantry.ingredientsNeeded).to.deep.equal([])
  })
  it('should hold property user can cook that defaults to true', () => {
    expect(user1.pantry.userCanCook).to.equal(true)
    expect(user2.pantry.userCanCook).to.equal(true)
  })
  it('should have a method to determine the ingredients and amounts a user needs to cook a recipe', () => {
    expect(user1.pantry.determineIngredientsNeeded(recipe1)).to.deep.equal([])
    expect(user2.pantry.determineIngredientsNeeded(recipe1)).to.deep.equal([])
    expect(user1.pantry.determineIngredientsNeeded(recipe2)).to.deep.equal([{missingIngredient: 1009016, quantityNeeded: 1.5 }, {missingIngredient: 20027, quantityNeeded: 1 }, {missingIngredient: 1002046, quantityNeeded: 1 }])
    expect(user2.pantry.determineIngredientsNeeded(recipe2)).to.deep.equal([{ missingIngredient: 11215, quantityNeeded: 1 }])
  })
  it('should have a method that checks if the user has enough ingredients in their pantry to cook a recipe', () => {
    user1.pantry.checkPantryForIngredients(recipe1)
    expect(user1.pantry.userCanCook).to.equal(true)
    user2.pantry.checkPantryForIngredients(recipe1)
    expect(user2.pantry.userCanCook).to.equal(true)
    user1.pantry.checkPantryForIngredients(recipe2)
    expect(user1.pantry.userCanCook).to.equal(false)
    user2.pantry.checkPantryForIngredients(recipe2)
    expect(user2.pantry.userCanCook).to.equal(false)
  })
})
