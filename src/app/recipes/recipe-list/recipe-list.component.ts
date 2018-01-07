import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const vm = this;
    vm.subscription = vm.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        vm.recipes = recipes;
      }
    )
    vm.recipes = vm.recipeService.getRecipes();
  }

  onNewRecipe() {
    const vm = this;
    vm.router.navigate(['new'], {relativeTo: vm.route});
  }

  ngOnDestroy() {
    const vm = this;
    vm.subscription.unsubscribe();
  }

}
