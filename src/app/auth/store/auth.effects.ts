import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as AuthAction from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.action$.ofType(AuthAction.TRY_SIGNUP);

    constructor(private action$: Actions) {

    }
}
