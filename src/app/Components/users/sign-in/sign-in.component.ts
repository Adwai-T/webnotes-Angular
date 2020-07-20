import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from 'src/app/services/users/user.service';
import { SignInUser } from 'src/app/interfaces/signInUser';
import { JWT } from 'src/app/interfaces/jwt-response';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signinForm: FormGroup;
  public isFormDataValid: boolean = true;
  public error: string = "";
  public loading:boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {

    if (this.signinForm.status === "VALID") {

      let signInUser: SignInUser = {
        userName: this.signinForm.value.username,
        password: this.signinForm.value.password
      }

      this.loading = true;

      this.userService.authenticate(signInUser).subscribe((data: JWT) => {
        this.loading = false;

        localStorage.setItem('jwt', data.jwt);
        this.userService.isAuthenticated = true;
        this.router.navigate(['/'])

        },
        (error) => {
          this.loading = false;

          this.isFormDataValid = false;
          this.error = "Incorrect Username or Password. Please check and try again."
        });

    } else {
      this.isFormDataValid = false;
      this.error = "Please Input valid Username and password";
    }
  }

}
