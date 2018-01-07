import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) {

  }
  onSaveData() {
    const vm = this;
    vm.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
      }
    );
  }

  onFetchData() {
    const vm = this;
    vm.dataStorageService.getRecipes();
  }
}
