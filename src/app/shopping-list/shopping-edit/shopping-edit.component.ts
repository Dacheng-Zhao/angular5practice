import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    const vm = this;
    vm.subscription = vm.slService.startedEditing.subscribe(
      (index: number) => {
        vm.editMode = true;
        vm.editedItemIndex = index;
        vm.editedItem = vm.slService.getIngredient(index);
        vm.slForm.setValue({
          name: vm.editedItem.name,
          amount: vm.editedItem.amount
        })
      }
    );
  }

  onSubmitForm(form: NgForm) {
    const vm = this;
    const value =  form.value;
    const newIngredient =  new Ingredient(value.name, value.amount);
    if (vm.editMode) {
      vm.slService.updateIngredient(vm.editedItemIndex, newIngredient);
    }else {
      vm.slService.addIngredient(newIngredient);
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
    if (vm.editedItemIndex !== undefined) {
      vm.slService.deleteIngredient(vm.editedItemIndex);
      vm.editedItemIndex = undefined;
    }
    vm.onClear();
  }

  ngOnDestroy() {
    const vm = this;
    vm.subscription.unsubscribe();
  }

}
