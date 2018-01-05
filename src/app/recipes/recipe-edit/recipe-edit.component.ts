import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let vm = this;
    vm.route.params.subscribe(
      (params: Params)=>{
        vm.id = +params["id"];
        vm.editMode = params["id"]!=null;
      }
    )
  }

}
