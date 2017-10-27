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

const appRoute:Routes=[
  { path: '', component: HomeComponent },
  {path: 'dashboard',component:DashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute,{enableTracing:true})
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
