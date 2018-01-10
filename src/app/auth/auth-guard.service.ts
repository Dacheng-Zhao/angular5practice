import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromAuthReducer from './store/auth.reducers';
import * as fromApp from './../app.reducers';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const vm = this;
        return vm.store.select('auth').map((authState: fromAuthReducer.State) => {
            return authState.authenticated;
        });
    }
}
