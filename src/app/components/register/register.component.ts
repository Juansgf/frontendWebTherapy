import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name:String;
    email:String;
    password:String;

    random(low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low)
    }

    idIcon = this.random(1, 800);
    iconS:String = `https://pokeapi.co/api/v2/pokemon/${this.idIcon}`
    

  constructor(private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    private router:Router,
    private iconService: IconService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      icon: this.iconS
    }
    

     // Required Fields
     if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Por favor, llena todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Llena todo')
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Por favor, usa una dirección de correo electrónico válida', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Email no valido')
      return false;
    }

    //Registrar Usuario
    this.authService.registerUser(user).subscribe(data =>{
      console.log("Entre al registro");
      if (data.body['success']){
        this.flashMessage.show('¡Registrado!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login'])
      }else{
        this.flashMessage.show('Algo salio mal', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login'])
      }
    })
  }

  getIcon(){
    this.iconService.getIconUrl(this.iconS).subscribe(result => {
      this.iconS = result['sprites']['front_default'];
    });
  }

}
