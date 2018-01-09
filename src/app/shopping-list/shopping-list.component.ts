import { Observable } from 'rxjs/Observable';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    const vm = this;
    vm.shoppingListState = vm.store.select('shoppingList');
    // vm.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     vm.ingredients = ingredients;
    //   }
    // )
  }

  onEditItem(index: number) {
    const vm = this;
    // vm.slService.startedEditing.next(index);
    vm.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

}
