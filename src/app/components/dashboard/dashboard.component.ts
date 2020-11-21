import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';
import { ElementRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  messageClass;
  message;
  title:String
  content:String
  newPost = false;
  loadingPosts=false;
  form;
  processing = true;
  username;
  user:any = {name:null};
  role:any = {role:null};
  id:any = {_id:null};
  icon:any;
  iconName:any = {icon:null}
  randomIconPost:any = {icon:null}

  public notis : any [];

  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    //private postService: PostService,
    private formBuilder: FormBuilder,
    private router:Router,
    private elementRef: ElementRef,
    private iconService: IconService,
    private toastr: ToastrService) {
      this.createNewPostForm();
     }

  createNewPostForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
      ])],
      content: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  newPostForm() {
    this.newPost = true; // Show new blog form
  }

   // Enable new blog form
   enableFormNewPostForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('content').enable(); // Enable body field
  }

  disableFormNewPostForm() {
    this.form.get('title').disable();
    this.form.get('content').disable();
  }

  draftComment() {

  }

  randomIconPostGenerate(){
    this.randomIconPost = `https://avatars.dicebear.com/api/gridy/${this.id}.svg`
  }

  addPost() {
    console.log("Entre al addpost")
    this.newPost = true;
    this.processing = true;

    this.randomIconPostGenerate();

    const fecha = new Date();

    console.log(this.formatDate(fecha));

    const post = {
      title: this.form.get('title').value,
      content: this.form.get('content').value,
      createdBy: this.id,
      iconBy: this.randomIconPost,
      postTime: this.formatDate(fecha),
      roleBy: this.role
    }

    console.log("Post enviado", post);
    //  Validar post
    if(!this.validateService.validatePost(post)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Email no valido')
      return false;
    }

    //Registrar Post
    this.authService.registerPost(post).subscribe(data =>{
      console.log("Entre a la funcion", data.body)
      if (data.body['success']){
        this.flashMessage.show('¡Publicación registrada!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard'])
        this.disableFormNewPostForm();
      }else{
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.processing = false;
        this.enableFormNewPostForm();
        this.router.navigate(['dashboard'])
      }
    })

  }

  reloadPosts() {
    this.router.navigate(['dashboard']);
  }



  ngOnInit(): void {
      this.authService.authenticatePorfile().subscribe(profile =>{
        this.user = profile.body.user;
        this.role = profile.body.user.role
        this.id = profile.body.user._id;
        this.iconName = profile.body.user.icon;
        // console.log(profile)
      });
      this.getIcon();
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }



  goBack() {
    window.location.reload(); // Clear all variable states
  }

  goBackR() {
    this.newPost= false; // Clear all variable states
  }

  getIcon(){
    this.iconService.getIcon().subscribe(result => {
      this.icon = result['sprites']['front_default'];
    });
  }

  formatDate(date){
    let month=String(date.getMonth()+1);
    let day=String(date.getDate());
    let year= String(date.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${day}/${month}/${year}`;
  }

  getNotis() {
    var size = 0;
    this.authService.authenticatePorfile().subscribe(profile =>{
      this.id = profile.body.user._id
      this.authService.getNotifications(this.id).subscribe(data => {
        this.notis = data['notification'];
        // console.log(this.notis)
        size = this.notis.length
        // console.log("El lenght", size)
        if(size > 0){
          for(var i = 0; i < size; i++){
            if(this.notis[i].seen){
              // this.toastr.warning('No hay notificaciones nuevas', 'Lo siento');
              break;
            } else {
              this.toastr.success(`${this.notis[i].action} a tu publicación`, 'Alguien');
            }
          }
        } else {
          this.toastr.error('No hay notificaciones', 'Lo siento');
        }
      });
    });
  }

}
