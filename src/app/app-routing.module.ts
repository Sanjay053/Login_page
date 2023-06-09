import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginGuardGuard } from './loginguard/login-guard.guard';
import { AuthGuardGuard } from './authguard/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path:'register', component: RegisterComponent },
  { path: 'forgetpassword', component:ForgetPasswordComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
