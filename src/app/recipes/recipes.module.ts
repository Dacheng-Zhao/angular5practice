import { SharedModule } from './../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from 'app/recipes/recipe-edit/recipe-edit.component';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {

}
