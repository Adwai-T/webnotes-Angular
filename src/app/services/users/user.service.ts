import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticatedUser } from 'src/app/interfaces/authenticatedUser';
import { SignInUser } from 'src/app/interfaces/signInUser';
import { JWT } from 'src/app/interfaces/jwt-response';
import { JWTBody } from 'src/app/interfaces/jwtbody';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authenticated:boolean = false;
  private authenticationUrl:string = 'https://adwait-webnotes.herokuapp.com/authenticate'
  private getAuthenticatedUserUrl:string = 'https://adwait-webnotes.herokuapp.com/user/userprofile'
  private authenticatedUser: AuthenticatedUser = {
    userName : "user",
    active : false,
    roles : "NON",
    id : 0,
    email : "user@example.com"
  }
  public isAuthenticatedEvent:EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  //--- Authenticate, get JWT and getAuthenticatedUserProfile
  authenticate(signInUser: SignInUser): Observable<JWT>{

    return this.http.post<JWT>(this.authenticationUrl, signInUser);

  }

  getAuthenticatedUser(): Observable<AuthenticatedUser>{

    let jwtToken = `Bearer ${localStorage.getItem('jwt')}`;

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization" : jwtToken
      })
    }

    return this.http.get<AuthenticatedUser>(this.getAuthenticatedUserUrl, httpOptions);
  }

  //--- Getters and Setters
  get isAuthenticated():boolean{
    return this.authenticated;
  }

  set isAuthenticated(authenticate: boolean){
    this.authenticated = authenticate;
    this.isAuthenticatedEvent.emit(authenticate);
  }

  get authenticatedUserDetails(): AuthenticatedUser{
    return this.authenticatedUser;
  }

  set authenticatedUserDetails(authenticatedUser: AuthenticatedUser){
    console.log(authenticatedUser);
    this.authenticatedUser = authenticatedUser;
  }

  //--- JWT Utilities

  hasValidJWTinlocalStroage(subject:string): boolean{
    if(
      localStorage.getItem('jwt') 
      && this.getSubjectFromJwt(localStorage.getItem('jwt')) === subject
      && this.checkJwtNotExpired(localStorage.getItem('jwt'))){
        return true;

      }else return false;
  }

  checkJwtNotExpired(jwt: string): boolean{

      let jwtArray = jwt.split('.');
      let jwtData: JWTBody = JSON.parse(atob(jwtArray[1]));

      return Math.round((new Date()).getTime()/1000) < jwtData.exp;

  }

  getSubjectFromJwt(jwt: string): string{

    let jwtArray = jwt.split('.');
    let jwtData: JWTBody = JSON.parse(atob(jwtArray[1]));

    return jwtData.sub;
  }

}
