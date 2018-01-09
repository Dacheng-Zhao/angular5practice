import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const vm = this;
    const token = vm.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', 'Bear abcd');
//     return vm.httpClient.put('https://ng-recipe-book-2dfef.firebaseio.com/recipes.json', vm.recipeService.getRecipes(),
//       {
//         observe: 'body',
//         params: new HttpParams().set('auth', token),
//         // headers: headers
//       }
// );
    const request = new HttpRequest('PUT', 'https://ng-recipe-book-2dfef.firebaseio.com/recipes.json', vm.recipeService.getRecipes(),
      {
        reportProgress: true,
        params: new HttpParams().set('auth', token)
      });
    return vm.httpClient.request(request);
  }

  getRecipes() {
    const vm = this;
    const token = vm.authService.getToken();
    vm.httpClient.get<Recipe[]>('https://ng-recipe-book-2dfef.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'body',
      responseType: 'json'
    }).
    map(
      (recipes: Recipe[]) => {
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
