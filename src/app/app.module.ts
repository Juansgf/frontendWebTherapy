import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarHomeComponent } from './components/navbarHome/navbarHome.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component'
import { ProfileComponent } from './components/profile/profile.component';
import { ShowPostComponent } from './components/show-posts/show-post.component';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';


import { ValidateService } from '../app/services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard'
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AdminGuard } from './guards/admin.guard';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';



const appRoutes: Routes = [
 //routes
{path:'', component:HomeComponent},
{path:'register', component:RegisterComponent},
{path:'login', component:LoginComponent},
{path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
{path:'profile', component:ProfileComponent,canActivate:[AdminGuard]},
{path:'home', component:HomeComponent},
{path:'edit-post/:post_id', component:EditPostComponent},
{path:'notifications', component:NotificationsComponent},
{path:'administrators', component:AdministratorsComponent}
];

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    ToastrModule.forRoot()
  ],

  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarHomeComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ShowPostComponent,
    ProfileComponent,
    EditPostComponent,
    NotificationsComponent,
    AdministratorsComponent
  ],

  providers: [ValidateService, AuthService, AuthGuard,{provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
