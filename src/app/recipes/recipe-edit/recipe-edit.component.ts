import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    let vm = this;
    vm.route.params.subscribe(
      (params: Params)=>{
        vm.id = +params["id"];
        vm.editMode = params["id"]!=null;
        vm.initForm();
      }
    )
  }

  private initForm(){
    let vm = this;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(vm.editMode){
      const recipe = vm.recipeService.getRecipe(vm.id);
      recipeName = recipe.name;
      recipeImagePath =  recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe["ingredients"]){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            "name": new FormControl(ingredient.name, Validators.required),
            "amount": new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }


    vm.recipeForm =  new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });
  }

  onSubmitForm(){
    let vm = this;
    // const newRecipe = new Recipe(
    //   vm.recipeForm.value["name"],
    //   vm.recipeForm.value["imagePath"],
    //   vm.recipeForm.value["description"],
    //   vm.recipeForm.value["ingredients"]
    // );
    if(vm.editMode){
      vm.recipeService.updateRecipe(vm.id, vm.recipeForm.value);
    }else{
      vm.recipeService.addRecipe(vm.recipeForm.value);
    }
    console.log(vm.recipeForm);
    vm.onCancel();
  }

  onAddIngredient(){
    let vm = this;
    (<FormArray>vm.recipeForm.get('ingredients')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    let vm = this;
    vm.router.navigate(["../"], {relativeTo: vm.route});
  }

  onDeleteIngredient(index: number){
    let vm = this;
    (<FormArray>vm.recipeForm.get('ingredients')).removeAt(index);
  }
}
