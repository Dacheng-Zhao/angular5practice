import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from './../../app.reducers';
import * as fromAuth from './../../auth/store/auth.reducers';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService,
              private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    const vm = this;
    vm.authState = vm.store.select('auth');
  }

  onSaveData() {
    const vm = this;
    vm.dataStorageService.storeRecipes().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    const vm = this;
    vm.dataStorageService.getRecipes();
  }
}
