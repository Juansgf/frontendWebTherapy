import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})
export class AdministratorsComponent implements OnInit {

  public admins : any [];
  icon: any;

  constructor( private authService:AuthService, private iconService: IconService) {}

  ngOnInit(): void {
    this.authService.authenticatePorfile().subscribe(profile =>{
      this.getAllAdmins();
      this.icon = profile.body.user.icon;
      this.icon = this.getIcon();
    })
  }


  getIcon(){
    this.iconService.getIcon().subscribe(result => {
      this.icon = result['sprites']['front_default'];
    });
  }

  getAllAdmins(){
    this.authService.authenticatePorfile().subscribe(profile =>{
      this.authService.getAdmins().subscribe(data => {
        console.log("DATA", data);
        this.admins = data['administradores'];
        console.log(this.admins);
      });

    });
  }


}
