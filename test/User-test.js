import { expect } from 'chai'
import Pantry from '../src/classes/Pantry'
import Recipe from '../src/classes/Recipe'
import User from '../src/classes/User'
import { sampleIngredientsData, sampleUsersData, sampleRecipeData } from '../src/data/sample-data'

describe('User', () => {
  sampleIngredientsData
  sampleUsersData
  sampleRecipeData
  Pantry
  let recipe1, recipe2, user1, user2, pantry

  beforeEach(() => {
    user1 = new User(sampleUsersData[0])
    user2 = new User(sampleUsersData[1])
    recipe1 = new Recipe(sampleRecipeData[0])
    recipe2 = new Recipe(sampleRecipeData[1])
    pantry = new Pantry(sampleUsersData[0].pantry)
    sampleIngredientsData
    sampleUsersData
    sampleRecipeData
  })

  it('should take a name', () => {
    expect(user1.name).to.equal('Saige O\'Kon')
  })
  it('should take another name', () => {
    expect(user2.name).to.equal('Ephraim Goyette')
  })
  it('should take an id', () => {
    expect(user1.id).to.equal(1)
  })
  it('should take another id', () => {
    expect(user2.id).to.equal(2)
  })
  it('should have a list of ingredients in pantry', () => {
    expect(user1.pantry).to.deep.equal(pantry)
  })
  it('should have a list of recipes to cook', () => {
    expect(user2.recipesToCook).to.deep.equal([])
  })
  it('should have a method to add recipes to cook', () => {
    user1.addRecipesToCook(recipe1)
    expect(user1.recipesToCook).to.deep.equal([recipe1])
    user2.addRecipesToCook(recipe2)
    expect(user2.recipesToCook).to.deep.equal([recipe2])
  })
  it('should have a method to remove recipes to cook', () => {
    user1.addRecipesToCook(recipe1)
    user1.addRecipesToCook(recipe2)
    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2])
    user1.removeRecipesToCook(recipe2)
    expect(user1.recipesToCook).to.deep.equal([recipe1])
    user1.removeRecipesToCook(recipe1)
    expect(user1.recipesToCook).to.deep.equal([])
  })
  it('should filter recipes to cook by tag', () => {
    user1.addRecipesToCook(recipe1)
    user1.addRecipesToCook(recipe2)
    expect(user1.filterToCookByTag('hor d\'oeuvre')).to.deep.equal([recipe1])
    expect(user1.filterToCookByTag('main dish')).to.deep.equal([recipe2])
  })
  it('should not return anything if item does not exist in recipes to cook', () => {
    user2.addRecipesToCook(recipe1)
    user2.addRecipesToCook(recipe2)
    expect(user2.filterToCookByTag('breakfast')).to.deep.equal([])
  })
  it('should filter recipes to cook by name', () => {
    user1.addRecipesToCook(recipe1)
    user1.addRecipesToCook(recipe2)
    expect(user1.filterToCookByName('loaded chocolate chip pudding cookie cups')).to.deep.equal([recipe1])
    expect(user1.filterToCookByName('maple dijon apple cider grilled pork chops')).to.deep.equal([recipe2])
  })
  it('should not return anything if name does exist in recipesToCook', () => {
    user2.addRecipesToCook(recipe1)
    user2.addRecipesToCook(recipe2)
    expect(user2.filterToCookByName('suuushhhhhhiiii')).to.deep.equal([])
  })
})
