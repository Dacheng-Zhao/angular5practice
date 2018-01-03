import { EventEmitter, Injectable } from '@angular/core';

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

  constructor(private slService: ShoppingListService){

  }
  getRecipes(){
    let vm = this;
    return vm.recipes.slice();
  }

  addIngredientToShoppingList(ingredient: Ingredient[]){
    let vm = this;
    vm.slService.addIngredients(ingredient);
  }
}
