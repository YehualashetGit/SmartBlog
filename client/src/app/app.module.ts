import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AuthService} from "./services/auth.service";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FlashMessagesModule} from "angular2-flash-messages";
import {AuthGuard} from "./guards/auth.guard";
import { BlogComponent } from './components/blog/blog.component';
import {NotAuthGuard} from "./guards/notAuth.guard";
import {BlogService} from "./services/blog.service";
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';

const appRoute:Routes=[
  {
    path: '',
    component: HomeComponent // Default Route
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'blog',
    component: BlogComponent, // Blog Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
  {
    path: '**',
    component: HomeComponent
  } // "Catch-All" Route
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
    BlogComponent,
    EditBlogComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoute,{enableTracing:true})
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard,BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
