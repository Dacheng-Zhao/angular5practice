import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("A test recipe","This is a sample test","./assets/image/10.jpg"),
    new Recipe("Another test recipe","This is another sample test","./assets/image/2.jpg")
  ];

  onRecipeSelected(recipe: Recipe){
    let vm = this;
    vm.recipeWasSelected.emit(recipe);
  }
  constructor() { }

  ngOnInit() {
  }

}
