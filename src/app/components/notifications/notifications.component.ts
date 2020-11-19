import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { IconService } from '../../services/icon.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [IconService]
})
export class NotificationsComponent implements OnInit {

  id:any;
  public notis : any [];
  noHayNotis = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router:Router,
    private iconService:IconService,
    private formBuilder: FormBuilder,
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService) {}


  ngOnInit(){
    this.getAllNotifications()
  }

  getAllNotifications(){
    var varsize = 0;
    this.authService.authenticatePorfile().subscribe(profile =>{
      this.id = profile.body.user._id
      this.authService.getNotifications(this.id).subscribe(data => {
        this.notis = data['notification'];
        varsize = this.notis.length;
        if(varsize > 0){
            console.log(varsize);
            this.noHayNotis = false;
            console.log("ADENTRO",this.noHayNotis);
        }
        console.log("AFUERA",this.noHayNotis)
      });

    });
  }

}
