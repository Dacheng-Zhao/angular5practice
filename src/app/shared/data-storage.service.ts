import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const vm = this;
    const token = vm.authService.getToken();
    return vm.http.put('https://ng-recipe-book-2dfef.firebaseio.com/recipes.json?auth=' + token, vm.recipeService.getRecipes());
  }

  getRecipes() {
    const vm = this;
    const token = vm.authService.getToken();
    vm.http.get('https://ng-recipe-book-2dfef.firebaseio.com/recipes.json?auth=' + token).
    map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes){
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ).
    subscribe(
      (recipes: Recipe[]) => {
        vm.recipeService.setRecipes(recipes);
      }
    )
  }
}
