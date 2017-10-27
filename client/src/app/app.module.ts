import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AuthService} from "./services/auth.service";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FlashMessagesModule} from "angular2-flash-messages";
import {AuthGuard} from "./guards/auth.guard";

const appRoute:Routes=[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  { path: '**', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoute,{enableTracing:true})
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
