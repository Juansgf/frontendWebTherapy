import {Injectable} from '@angular/core';
import {Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router){

    }
    //role:any = {role:null};
    canActivate(){
       if(this.authService.loggedIn()){    
        return true;
        }else{
            this.router.navigate(['/login']);
        }
    }
    /*canActivate(route: ActivatedRouteSnapshot): boolean {
        this.authService.authenticatePorfile().subscribe(profile =>{
            this.role = profile.body.user.role
            console.log(this.role)
          })
        return route.data.roles.some( ai => this.authService.getRole(this.role).includes(ai) );
      }*/
    
      

    
}

