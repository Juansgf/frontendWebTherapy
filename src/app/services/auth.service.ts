import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { identifierModuleUrl } from '@angular/compiler';
//import { profile } from 'console';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  post:any;
  role: any;
  id:any;
  idPost:any;

  constructor(private http:HttpClient, public jwtHelper: JwtHelperService) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/register', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }



  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(headers);
    return this.http.post('http://localhost:3000/user/authenticate', user, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }


  authenticatePorfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    //let headers = new HttpHeaders();
    //let headers = new HttpHeaders({ 'Authorization': this.authToken });
    headers = headers.set('Authorization', this.authToken);
    // console.log(this.authToken)
    headers = headers.set('Content-Type', 'application/json');
    // console.log(headers.get('Authorization'))
    return this.http.get('http://localhost:3000/user/profile',{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: any) => res));
  }

  getUserPost(id) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/user/userPost/'+id,{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: any) => res));
  }



  updateUser(user,id) {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.set('Authorization', this.authToken);
    headers = headers.set('Content-Type', 'application/json');
    console.log(id)
    return this.http.put('http://localhost:3000/user/updateProfile/'+id, user,{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  updatePost(post,id) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log(id)
    return this.http.put('http://localhost:3000/user/editPost/'+id,post,{
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  registerPost(post) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/newPost', post, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  storePostData(post) {
    localStorage.setItem('post', JSON.stringify(post));
    this.post = post;
  }

  /*getAllPost(){
    return this.http.get('http://localhost:3000/user/allPosts', {});
  }*/


  /*editPost(postEdited){
    //this.createAuthenticationHeaders();
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    return this.http.put('http://localhost:3000/user/updatePost/', postEdited, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));

  }*/

  deletePost(idPost){
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    console.log(idPost)
    return this.http.delete('http://localhost:3000/user/deletePost/'+idPost);

  }

  likePost(post){
    const postData = {id:post._id,
    likes: post.likes};
    console.log(post.likes);
    return this.http.post('http://localhost:3000/user/likePost/', postData)
  }

  dislikePost(post){
    const postData = {id:post._id,
      dislikes: post.dislikes};
      console.log(post.dislikes);
      return this.http.post('http://localhost:3000/user/dislikePost/', postData)
  }

  getNotifications(idUser){
    const notiData = {
      _id: idUser
    };
    return this.http.post('http://localhost:3000/user/showNotifications/', notiData)
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  loggedIn() {
    const token: string = localStorage.getItem('id_token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(role) {
    return this.role
  }

  registerComment(comment) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    return this.http.put('http://localhost:3000/user/addComment', comment, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  registerNotification(notification){
    return this.http.post('http://localhost:3000/user/addNotification/', notification)
  }

  getAdmins(){
    return this.http.get('http://localhost:3000/user/getAdmins/')
  }

}
