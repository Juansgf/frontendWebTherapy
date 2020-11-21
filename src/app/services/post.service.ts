import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {

    post:any;

  constructor(
    private http:HttpClient
  ) { }

  registerPost(post) {
    console.log("Entre al register post");
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    console.log("todo bien aqui")
    return this.http.post('https://desolate-reef-90306.herokuapp.com/user/newPost', post, {
      headers: headers,
      observe: 'response'
    }).pipe(map((res: HttpResponse<JSON>) => res));
  }

  storePost(post, token) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('post', JSON.stringify(post));
    this.post = post;
  }


}
