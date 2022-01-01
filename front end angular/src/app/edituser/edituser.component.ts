import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role: null,
    id:null
  };
  userdata: any;
  isSuccessful: boolean=false;
  isSignUpFailed: boolean=false;

  constructor(private userService: UserService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParams.id;
    if(id){
      this.userService.getUserByID(id).subscribe(
    
        data => {
       //   this.isSuccessful=true;
          this.userdata=  JSON.parse(data).rows[0];
          this.form.username=(this.userdata).username;
          this.form.email=(this.userdata).email;
          this.form.password=(this.userdata).password;
          this.form.role=(this.userdata).role;
          this.form.id=(this.userdata).id;
         
         
          this.isSignUpFailed = false;
     //     this.isSuccessful = true;
      //    this.isSignUpFailed = false;
        },
        err => {
         //this.errorMessage = err.error.message;
       //   this.isSignUpFailed = true;
        }
      
    );
    }

  }
  onSubmit(): void {
    const { username, email, password, role ,id} = this.form;

    this.userService.updateUser(id,username, email, password, role).subscribe(
      data => {
 
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
     //   this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
