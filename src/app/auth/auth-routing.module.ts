import { SigninComponent } from 'app/auth/signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const authRouting: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent}
]

@NgModule({
    imports: [RouterModule.forChild(authRouting)],
    exports: [RouterModule]
})

export class AuthRoutingModule {

}
