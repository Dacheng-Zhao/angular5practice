import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService{
  constructor(private http: Http,
              private recipeService: RecipeService){
  }

  storeRecipes(){
    let vm = this;
    return vm.http.put("https://ng-recipe-book-2dfef.firebaseio.com/recipes.json", vm.recipeService.getRecipes());
  }

  getRecipes(){
    let vm = this;
    vm.http.get("https://ng-recipe-book-2dfef.firebaseio.com/recipes.json").
    map(
      (response:Response)=>{
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes){
          if(!recipe['ingredients']){
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ).
    subscribe(
      (recipes: Recipe[])=>{
        vm.recipeService.setRecipes(recipes);
      }
    )
  }
}
