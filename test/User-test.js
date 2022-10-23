import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';
import { sampleIngredientsData, sampleUsersData, sampleRecipeData } from '../src/data/sample-data';

describe('User', () => {
  sampleIngredientsData
  sampleUsersData
  sampleRecipeData
  let recipe1, recipe2, user1, user2


  beforeEach(() => {
    user1 = new User(sampleUsersData[0])
    user2 = new User(sampleUsersData[1])
    recipe1 = new Recipe(sampleRecipeData[0]);
    recipe2 = new Recipe(sampleRecipeData[1]);
    sampleIngredientsData;
    sampleUsersData;
    sampleRecipeData;
  });

  it('should take a name', () => {
    expect(user1.name).to.equal("Saige O'Kon");
  });
  it('should take another name', () => {
    expect(user2.name).to.equal("Ephraim Goyette");
  });
  it('should take an id', () => {
    expect(user1.id).to.equal(1);
  });
  it('should take another id', () => {
    expect(user2.id).to.equal(2);
  });
  it('should have a list of ingredients in pantry', () => {
    expect(user1.pantry).to.deep.equal([{"ingredient": 11297,"amount": 4},{"ingredient": 1082047,"amount": 10},{"ingredient": 20081,"amount": 5},{"ingredient": 11215,"amount": 5},{"ingredient": 2047,"amount": 6},{"ingredient": 1123,"amount": 8},{"ingredient": 11282,"amount": 4},{"ingredient": 6172,"amount": 2},{"ingredient": 2044,"amount": 2},{"ingredient": 2050,"amount": 4},{"ingredient": 1032009,"amount": 3},{"ingredient": 5114,"amount": 3},{"ingredient": 1017,"amount": 2},{"ingredient": 18371,"amount": 7},{"ingredient": 1001,"amount": 6},{"ingredient": 99223,"amount": 2},{"ingredient": 1230,"amount": 2},{"ingredient": 9152,"amount": 4},{"ingredient": 10611282,"amount": 2},{"ingredient": 93607,"amount": 2},{"ingredient": 14106,"amount": 4},{"ingredient": 1077,"amount": 4},{"ingredient": 6150,"amount": 2},{"ingredient": 1124,"amount": 2},{"ingredient": 10011693,"amount": 4},{"ingredient": 1102047,"amount": 2},{"ingredient": 19206,"amount": 2},{"ingredient": 1145,"amount": 4},{"ingredient": 1002030,"amount": 4},{"ingredient": 12061,"amount": 2},{"ingredient": 19335,"amount": 4},{"ingredient": 15152,"amount": 3},{"ingredient": 9003,"amount": 2},{"ingredient": 18372,"amount": 3},{"ingredient": 2027,"amount": 2}]);
  });
  it('should have a list of recipes to cook', () => {
    expect(user2.recipesToCook).to.deep.equal([]);
  });
  it('should have a method to add recipes to cook', () => {
    user1.addRecipesToCook(recipe1);
    expect(user1.recipesToCook).to.deep.equal([recipe1]);
    user2.addRecipesToCook(recipe2);
    expect(user2.recipesToCook).to.deep.equal([recipe2]);
  });
  it('should have a method to remove recipes to cook', () => {
    user1.addRecipesToCook(recipe1);
    user1.addRecipesToCook(recipe2);
    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2]);
    user1.removeRecipesToCook(recipe2);
    expect(user1.recipesToCook).to.deep.equal([recipe1]);
    user1.removeRecipesToCook(recipe1);
    expect(user1.recipesToCook).to.deep.equal([]);
  });
  it('should filter recipesToCook by tag', () => {
    user1.addRecipesToCook(recipe1);
    user1.addRecipesToCook(recipe2);
    expect(user1.filterToCookByTag("hor d'oeuvre")).to.deep.equal([recipe1]);
    expect(user1.filterToCookByTag("main dish")).to.deep.equal([recipe2]);
  });
  it('should return nothing if item does not exist in recipesToCook', () => {
    user2.addRecipesToCook(recipe1);
    user2.addRecipesToCook(recipe2);
    expect(user2.filterToCookByTag("breakfast")).to.deep.equal([]);
  });
  it('should filter recipesToCook by name', () => {
    user1.addRecipesToCook(recipe1);
    user1.addRecipesToCook(recipe2);
    expect(user1.filterToCookByName("Loaded Chocolate Chip Pudding Cookie Cups")).to.deep.equal([recipe1]);
    expect(user1.filterToCookByName("Maple Dijon Apple Cider Grilled Pork Chops")).to.deep.equal([recipe2]);
  });
  it.only('should return nothing if name does exist in recipesToCook', () => {
    user2.addRecipesToCook(recipe1);
    user2.addRecipesToCook(recipe2);
    expect(user2.filterToCookByName("suuushhhhhhiiii")).to.deep.equal([]);
  });
});
