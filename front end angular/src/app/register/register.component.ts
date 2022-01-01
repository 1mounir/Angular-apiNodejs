import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    role: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  id: any;
  userdata: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  
  // this.route.queryParams.subscribe(params => {
   // const userId = params['id'];
   /// console.log(userId);
  ///});
    // get selected user id

    
  }

  onSubmit(): void {
    const { username, email, password, role } = this.form;

    this.authService.register(username, email, password, role).subscribe(
      data => {
 
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
function loadUserData(id:any): void {

 

}

