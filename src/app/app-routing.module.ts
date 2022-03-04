import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './register/login/login.component';
import { RegisterDashComponent } from './register/register-dash/register-dash.component';
import { SignupComponent } from './register/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'register-dash', pathMatch: 'full' },
  { path: 'register-dash', component: RegisterDashComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
