import { StartEdit } from './../store/shopping-list.actions';
import { ShoppingListModule } from './../shopping-list.module';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { AppState } from 'app/shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    const vm = this;
    // vm.subscription = vm.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     vm.editMode = true;
    //     vm.editedItemIndex = index;
    //     vm.editedItem = vm.slService.getIngredient(index);
    //     vm.slForm.setValue({
    //       name: vm.editedItem.name,
    //       amount: vm.editedItem.amount
    //     })
    //   }
    // );
    vm.subscription = vm.store.select('shoppingList').subscribe(
      (data: AppState) => {
        if (data.editedItemIndex > -1) {
          vm.editMode = true;
          console.log(data);
          vm.slForm.setValue({
            name: data.editedItem.name,
            amount: data.editedItem.amount
          })
        } else {
          vm.editMode = false;
        }
      }
    )
  }

  onSubmitForm(form: NgForm) {
    const vm = this;
    const value =  form.value;
    const newIngredient =  new Ingredient(value.name, value.amount);
    if (vm.editMode) {
      console.log('update shopping list');
      vm.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
      // vm.slService.updateIngredient(vm.editedItemIndex, newIngredient);
    } else {
      console.log('add shopping list');
      vm.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    vm.editMode = false;
    form.reset();
  }

  onClear() {
    const vm = this;
    vm.slForm.reset();
    vm.editMode = false;
  }

  onDelete() {
    const vm = this;
    // if (vm.editedItemIndex !== undefined) {
    //   // vm.slService.deleteIngredient(vm.editedItemIndex);
    //   vm.store.dispatch(new ShoppingListActions.DeleteIngredient(vm.editedItemIndex));
    //   vm.editedItemIndex = undefined;
    // }
    vm.store.dispatch(new ShoppingListActions.DeleteIngredient());
    vm.onClear();
  }

  ngOnDestroy() {
    const vm = this;
    vm.subscription.unsubscribe();
  }

}
