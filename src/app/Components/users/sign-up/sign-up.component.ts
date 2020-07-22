import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormControlName } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { AuthenticatedUser } from 'src/app/interfaces/authenticatedUser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  public signupForm:FormGroup;
  public errors: string[] = [];
  public loading:boolean = false;
  public success:boolean = false;

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {

    this.success = false;
    this.loading = false;
    this.errors = [];

    this.signupForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.email, Validators.required]),
      active: new FormControl(true),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      roles : new FormControl("ROLE_VISITOR")
    });
  }

  onSubmit(): void{

    this.loading = true;
    this.errors = [];

    let userDetails:AuthenticatedUser = {

      userName : this.signupForm.value.userName,
      email : this.signupForm.value.email,
      active : this.signupForm.value.active,
      password : this.signupForm.value.password,
      roles : this.signupForm.value.roles

    }

    if(this.signupForm.status === "VALID"){

      let createUserSubscription:Subscription  = this.userService.signUp(userDetails).subscribe((data)=>{
        
        this.success = true;
        this.loading = false;

        createUserSubscription.unsubscribe();

      },
      (error)=>{

        this.errors.push("There was a error creating the user.");

        if(error.message){
          this.errors.push(error.message);
        }

        this.loading = false;

        createUserSubscription.unsubscribe();

      });

    }else {

      console.log(this.signupForm);

      if(this.signupForm.controls.userName.status === "VALID"){

        if(this.signupForm.controls.email.status === "INVALID"){
          this.errors.push("Please Enter a Valid Email");
        }
  
        if(this.signupForm.controls.password.status === "INVALID"){
          this.errors.push("Please Enter a password that is atleast 5 characters")
        }

      }else {
        this.errors.push("All the fields are mandatory.")
      }

      this.loading = false;

    }

  }

}
