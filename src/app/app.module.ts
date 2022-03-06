import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './register/login/login.component';
import { SignupComponent } from './register/signup/signup.component';
import { PostComponent } from './dashboard/post/post.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { NotifComponent } from './dashboard/notif/notif.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RegisterDashComponent } from './register/register-dash/register-dash.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { PollComponent } from './dashboard/poll/poll.component';
import { MonthlyDiagramComponent } from './dashboard/monthly-diagram/monthly-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostComponent,
    ProfileComponent,
    NotifComponent,
    DashboardComponent,
    RegisterDashComponent,
    PollComponent,
    MonthlyDiagramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
