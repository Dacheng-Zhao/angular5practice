import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private route: Router) {

    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
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
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => {
                        vm.token = token;
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

    getToken() {
       const vm = this;
       firebase.auth().currentUser.getIdToken()
       .then(
           (token: string) => {
               vm.token = token;
           }
       )
       return vm.token;
    }

    logout() {
        const vm = this;
        firebase.auth().signOut();
        vm.token = null;
    }

    isAuthenticated() {
        const vm = this;
        return vm.token != null;
    }
}
