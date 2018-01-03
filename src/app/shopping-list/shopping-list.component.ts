import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    let vm = this;
    vm.ingredients = vm.slService.getIngredients();
    vm.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[])=>{
        vm.ingredients = ingredients;
      }
    )
  }

}
