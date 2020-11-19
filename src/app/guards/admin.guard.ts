import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  role:any = {role:null};

  constructor(private authService:AuthService, private router:Router){

  }
  
  
  canActivate(){
    this.authService.authenticatePorfile().subscribe(profile =>{
      this.role = profile.body.user.role;
      console.log(this.role)
    })
    if(this.authService.loggedIn() && this.role == "ADMIN" ){    
      return true;
     }else{
         this.router.navigate(['/dashboard']);
     }
 }
  
}
