import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const vm = this;
    vm.route.params.subscribe(
      (params: Params) => {
        vm.id = +params['id'];
        vm.recipe = vm.recipeService.getRecipe(vm.id);
      }
    )
  }

  onAddToShoppingList() {
    const vm = this;
    vm.recipeService.addIngredientToShoppingList(vm.recipe.ingredients);
  }

  onEditRecipe() {
    const vm = this;
    vm.router.navigate(['../', vm.id, 'edit'], {relativeTo: vm.route})
  }

  onDeleteRecipe() {
    const vm = this;
    vm.recipeService.deleteRecipe(vm.id);
    vm.router.navigate(['/recipes'], {relativeTo: vm.route});
  }

}
