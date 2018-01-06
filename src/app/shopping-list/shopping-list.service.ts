import { EventEmitter } from '@angular/core';
import { Subject } from "rxjs/Subject";

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients : Ingredient[]=[
    new Ingredient("apple",5),
    new Ingredient("Tomato",10)
  ];

  getIngredients(){
    let vm = this;
    return vm.ingredients.slice();
  }

  getIngredient(index: number){
    let vm = this;
    return vm.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    let vm = this;
    vm.ingredients.push(ingredient);
    vm.ingredientsChanged.emit(vm.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    let vm = this;
    vm.ingredients.push(...ingredients);
    vm.ingredientsChanged.emit(vm.ingredients.slice() );
  }

  updateIngredient(index: number, ingredient: Ingredient){
    let vm = this;
    vm.ingredients[index] = ingredient;
    vm.ingredientsChanged.next(vm.ingredients.slice());
  }

  deleteIngredient(index:number){
    let vm = this;
    vm.ingredients.splice(index,1);
    vm.ingredientsChanged.next(vm.ingredients.slice());
  }
}
