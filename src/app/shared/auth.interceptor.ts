import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const vm = this;
        console.log('intercepted!');
        console.log(request);
        // const copiedRequest = request.clone({headers: request.headers.set('', '')});
        const copiedRequest = request.clone({params: request.params.set('auth', vm.authService.getToken())});
        return next.handle(request);
    }
}
