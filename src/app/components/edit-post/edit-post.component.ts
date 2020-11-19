import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart  } from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private elementRef: ElementRef, private router: Router) { }

  id:String
  title :String
  cont: String
  title1:any 
  public userId : string;



  updatePost(){
    
    const post = {
      title: this.title,
      content: this.cont
    }
    console.log(this.id)
    console.log(post)
    this.authService.updatePost(post,this.id).subscribe(data =>{
      //console.log("Entre a la funcion", data.body)
      console.log(data)
      if (data.body['success']){
        
      }else{
        this.router.navigate(['/dashboard'])
      }
    })
  }

  cancelPost(){
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.id = params['post_id'];
      
      //console.log(this.title1)
   // (+) converts string 'id' to a number         
    // In a real app: dispatch action to load the details here.     });
    })
  }

}
