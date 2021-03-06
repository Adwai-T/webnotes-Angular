import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  isAuth :boolean = false;
  private authSubscription :Subscription;
  public subject :string = '';
  public isMobileScreen :boolean = false;
  private width :any = 0;
  public toggleNavBar :boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.width = window.innerWidth;
    if(this.width < 600){
      this.isMobileScreen = true;
    }

    this.authSubscription = this.userService.isAuthenticatedEvent.subscribe((data:boolean)=>{
      this.isAuth = data;
      this.subject = this.userService.getSubjectFromJwt(localStorage.getItem('jwt'));
    });

    if(localStorage.getItem('jwt')){
      let jwt = localStorage.getItem('jwt');

      if(this.userService.hasValidJWTinlocalStroage(this.userService.getSubjectFromJwt(jwt))){
        this.userService.isAuthenticated = true;
      }
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  // }

  onSignOut():void{
    this.isAuth = false;
    this.userService.isAuthenticated = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void{
    this.authSubscription.unsubscribe();
  }

}
