import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as fromAuth from '../auth/store/auth.reducers';
import { Injectable } from '@angular/core';
import * as AuthAction from './store/auth.actions';

@Injectable()
export class AuthService {
    constructor(private route: Router,
                private store: Store<fromAuth.State>) {

    }

    signupUser(email: string, password: string) {
        const vm = this;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            (user) => {
                vm.store.dispatch(new AuthAction.SignUp());
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => {
                        vm.store.dispatch(new AuthAction.SetToken(token));
                    }
                )
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }

    signinUser(email: string, password: string) {
        const vm = this;
        vm.route.navigate(['./recipes']);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response) => {
                vm.store.dispatch(new AuthAction.SignIn());
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => {
                        vm.store.dispatch(new AuthAction.SetToken(token));
                    }
                )
                console.log(response);
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    }
    logout() {
        const vm = this;
        firebase.auth().signOut();
        vm.store.dispatch(new AuthAction.LogOut());
    }
}
