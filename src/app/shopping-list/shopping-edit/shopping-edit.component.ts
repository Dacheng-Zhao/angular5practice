import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    let vm = this;
    const ingName = vm.nameInputRef.nativeElement.value;
    const ingAmount = vm.amountInputRef.nativeElement.value;
    const newIngredient =  new Ingredient(ingName,ingAmount);
    vm.slService.addIngredient(newIngredient);
  }

}
