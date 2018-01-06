import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("A test recipe","This is a sample test","./assets/image/10.jpg",[
      new Ingredient("meat",1),
      new Ingredient("French Fries",7)
    ]),
    new Recipe("Another test recipe","This is another sample test","./assets/image/2.jpg",
  [
    new Ingredient("Buns",2),
    new Ingredient("Meat",1)
  ])
  ];

  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService){

  }

  setRecipes(recipes: Recipe[]){
    let vm = this;
    vm.recipes = recipes;
    vm.recipeChanged.next(vm.recipes.slice());
  }

  getRecipes(){
    let vm = this;
    return vm.recipes.slice();
  }

  getRecipe(index:number){
    let vm = this;
    return vm.recipes[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]){
    let vm = this;
    vm.slService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe){
    let vm = this;
    vm.recipes.push(recipe);
    vm.recipeChanged.next(vm.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    let vm = this;
    vm.recipes[index] = newRecipe;
    vm.recipeChanged.next(vm.recipes.slice());
  }

  deleteRecipe(index: number){
    let vm = this;
    vm.recipes.splice(index,1);
    vm.recipeChanged.next(vm.recipes.slice());
  }

}
