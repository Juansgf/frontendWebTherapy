import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IconService{

  apiUrl:any;
  // apiUrl = 'https://avatars.dicebear.com/api/gridy/:seed.svg'
  // apiUrl = 'https://ui-avatars.com/api/?name=John+Doe'

  constructor(private http:HttpClient) { }

  getIcon(){
    this.apiUrl = JSON.parse(localStorage.getItem('user'));
    // console.log("apiUrl", this.apiUrl)
    return this.http.get(this.apiUrl.icon, {});
  }

  getIconUrl(url){
    return this.http.get(url, {});
  }

  getIconPosts(urlIconPost){
    console.log("posts recibidos", urlIconPost)
    // for(var i = 0; i < post.length; i++){
    //   this.apiUrl = post[i].iconBy;
    //   console.log("urls recibidos", this.apiUrl)
    //   return this.http.get(this.apiUrl, {});
    // }
    this.apiUrl = urlIconPost;
    console.log("urls recibida", this.apiUrl)
    return this.http.get(this.apiUrl, {});
  }

}
