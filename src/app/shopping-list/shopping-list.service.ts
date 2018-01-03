import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients : Ingredient[]=[
    new Ingredient("apple",5),
    new Ingredient("Tomato",10)
  ];

  getIngredients(){
    let vm = this;
    return vm.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    let vm = this;
    vm.ingredients.push(ingredient);
    vm.ingredientsChanged.emit(vm.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    let vm = this;
    vm.ingredients.push(...ingredients);
    vm.ingredientsChanged.emit(vm.ingredients.slice());
  }
}
