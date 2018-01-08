import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';



@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        FormsModule,
        AuthRoutingModule
    ]
})


export class AuthModule {

}
