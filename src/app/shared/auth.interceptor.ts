import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import * as fromApp from './../app.reducers';
import * as fromAuthReducer from './../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const vm = this;
        console.log('intercepted!');
        console.log(request);
        // const copiedRequest = request.clone({headers: request.headers.set('', '')});
        return vm.store.select('auth')
        .take(1)
        .switchMap(
            (authState: fromAuthReducer.State) => {
                const copiedRequest = request.clone({params: request.params.set('auth', authState.token)});
                return  next.handle(request);
            }
        )
    }
}
