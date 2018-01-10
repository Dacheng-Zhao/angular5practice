import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as fromApp from './../../app.reducers';
import * as fromAuthAction from './../store/auth.actions';
import { Store } from '@ngrx/store/src/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService
   // private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const vm = this;
    const email = form.value.email;
    const password = form.value.password;
    vm.authService.signupUser(email, password);
    // vm.store.dispatch(new fromAuthAction.TrySignup({username: email, password: password}));
  }

}
