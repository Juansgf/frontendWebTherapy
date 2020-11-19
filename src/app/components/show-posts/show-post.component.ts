import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { IconService } from '../../services/icon.service';
import { ShowPostService } from './show-post.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-list.component.css'],
  providers: [ ShowPostService, IconService ]
})
export class ShowPostComponent implements OnInit {

  public posts : any [];
  public comments : any [];
  // icon:any;
  id:any = {_id:null};
  truePost = false;
  icon:any;
  form;
  randomIconComment:any;

  user_id : String

  newComment = [false, this.id];
  showComment = [false, this.id];

  constructor(
    private showPostService: ShowPostService,
    private http: HttpClient,
    private authService: AuthService,
    private router:Router,
    private iconService:IconService,
    private formBuilder: FormBuilder,
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService) {
      this.createCommentForm();
  }


  ngOnInit(){
    this.getAllPost();
  }

  deletePost(idPost){
    console.log("ENTRE AL DELETE");
    this.authService.deletePost(idPost).subscribe(data => {
      console.log("Post deleted with id "+idPost)
      console.log(data)
    })
    window.location.reload();
  }

  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
      this.posts = result['post'];
      // console.log(result)
      console.log("TODOS LOS POSTS",this.posts)

      this.authService.authenticatePorfile().subscribe(profile => {
        this.id = profile.body.user._id

        const diffPost = this.posts.map(person => person.createdBy == this.id);
        console.log(diffPost)

        for(var i = 0; i < diffPost.length; i++){
          if(diffPost[i] = true){

          }
        }
      })
    });
  }

  getPopularPost(){
    this.showPostService.getAllPopularPost().subscribe(result => {
      this.posts = result['post'];
      // console.log(result)
      console.log("TODOS LOS POSTS POPULARES",this.posts)

      this.authService.authenticatePorfile().subscribe(profile => {
        this.id = profile.body.user._id

        const diffPost = this.posts.map(person => person.createdBy == this.id);
        console.log(diffPost)

        for(var i = 0; i < diffPost.length; i++){
          if(diffPost[i] = true){

          }
        }
      })
    });
  }

  getAdminPost(){
    this.showPostService.getAllAdminPost().subscribe(result => {
      this.posts = result['post'];
      // console.log(result)
      console.log("TODOS LOS POSTS ADMIN",this.posts)

      this.authService.authenticatePorfile().subscribe(profile => {
        this.id = profile.body.user._id

        const diffPost = this.posts.map(person => person.createdBy == this.id);
        console.log(diffPost)

        for(var i = 0; i < diffPost.length; i++){
          if(diffPost[i] = true){

          }
        }
      })
    });
  }

  likePost(post){
    const fecha = new Date();

    this.randomIconPostGenerate(this.id, post._id);

    console.log("likes", post);
    this.authService.likePost(post).subscribe(data => {
      this.getAllPost();
    });

    const notificacion = {
      action: "le dió like",
      userFrom: this.id,
      userTo: post.createdBy,
      iconFrom: this.randomIconComment,
      actionTime: this.formatDate(fecha),
      idPost: post._id,
      postTitle: post.title
    }
    //Registrar Notificacion
    this.authService.registerNotification(notificacion).subscribe(data =>{
      if (data['success']){
        this.flashMessage.show('Notificacion registrada!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })
  }

  dislikePost(post){
    const fecha = new Date();

    this.randomIconPostGenerate(this.id, post._id);

    this.authService.dislikePost(post).subscribe(data => {
      this.getAllPost();
    });

    const notificacion = {
      action: "le dió dislike",
      userFrom: this.id,
      userTo: post.createdBy,
      iconFrom: this.randomIconComment,
      actionTime: this.formatDate(fecha),
      idPost: post._id,
      postTitle: post.title
    }
    //Registrar Notificacion
    this.authService.registerNotification(notificacion).subscribe(data =>{
      if (data['success']){
        this.flashMessage.show('Notificacion registrada!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })
  }

  reloadPosts() {
    this.router.navigate(['/dashboard']);
  }

  // getIcon(){
  //   this.iconService.getIcon().subscribe(result => {
  //     // console.log(result)
  //     // this.icon = result;
  //     console.log("resultado api", result['sprites']['front_default']);
  //     this.icon = result['sprites']['front_default'];
  //   });
  // }

  // getIconPosts(iconPostUrl){
  //   this.iconService.getIconPosts(iconPostUrl).subscribe(result => {
  //     // console.log(result)
  //     // this.icon = result;
  //     console.log("resultado posts api", result['sprites']['front_default']);
  //     this.icon = result['sprites']['front_default'];
  //   });
  // }

  createCommentForm(){
    this.form = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(5),
      ])]
    })
  }

  randomIconPostGenerate(idUser, idPost){
    const iconComment = idUser + idPost
    this.randomIconComment = `https://avatars.dicebear.com/api/gridy/${iconComment}.svg`
  }

  addComment(post){
    const fecha = new Date();

    this.randomIconPostGenerate(this.id, post._id);
    const comment = {
      postId: post._id,
      comment: this.form.get('comment').value,
      createdBy: post.createdBy,
      iconBy: this.randomIconComment,
      commentTime: this.formatDate(fecha)
    }

    const notificacion = {
      action: "comentó",
      userFrom: this.id,
      userTo: post.createdBy,
      iconFrom: this.randomIconComment,
      actionTime: this.formatDate(fecha),
      idPost: post._id,
      postTitle: post.title
    }

    console.log("Comentario", comment);
    console.log("Notificacion", notificacion);
    //  Validar comentario
    if(!this.validateService.validateComment(comment)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Registrar Comentario
    this.authService.registerComment(comment).subscribe(data =>{
      console.log("Entre a la funcion", data.body)
      if (data.body['success']){
        this.flashMessage.show('Comentario registrado!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })

    //Registrar Notificacion
    this.authService.registerNotification(notificacion).subscribe(data =>{
      console.log("Entre a la funcion noti", data)
      if (data['success']){
        this.flashMessage.show('Notificacion registrada!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard'])
      }
    })
  }

  newCommentForm(id){
    this.newComment[0] = true;
    this.showComment[0] = false;
    this.newComment[1] = id;
  }

  showComments(id){
    console.log("ID DEL POST", this.id);
    console.log(id);
    this.showComment[1] = id;
    if(this.showComment[1] != id){
      this.showComment[0] = false;
    }else{
      this.showComment[0] = true;
    }
    this.newComment[0] = false;   
    this.newComment[1] = id;
    console.log("ID ORIGINAL", this.id);
    this.id = id;
    
  }

  cancelShowComments(id) {
    this.showComment[0] = false;
    this.showComment[1] = id;
    this.id = id;
  }

  cancelCommentForm() {
    this.newComment[0] = false;
    this.showComment[0] = false;
  }

  reloadPage(){
    window.location.reload();
  }

  formatDate(date){
    let month=String(date.getMonth()+1);
    let day=String(date.getDate());
    let year= String(date.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${day}/${month}/${year}`;
  }

}
