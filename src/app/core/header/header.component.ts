import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService) {

  }
  onSaveData() {
    const vm = this;
    vm.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    const vm = this;
    vm.dataStorageService.getRecipes();
  }
}
