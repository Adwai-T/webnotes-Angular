import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../users/user.service';
import { ServerMessage } from 'src/app/interfaces/serverMessage';
import { UserComment } from 'src/app/interfaces/user-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  //---Can have url query -> pageNumber, numberOfComments
  private allCommentsUrl:string = "https://adwait-webnotes.herokuapp.com/comments";
  private userCommentsUrl:string = "https://adwait-webnotes.herokuapp.com/comments/user";
  private topicCommentsUrl:string = "https://adwait-webnotes.herokuapp.com/comments/"

  private postCommentsUrl:string = "https://adwait-webnotes.herokuapp.com/comments/user";
  private deleteCommentsUrl:string = "https://adwait-webnotes.herokuapp.com/comments/user/";

  constructor(private http:HttpClient, private userService: UserService) { }

  //---Get all comments
  public getAllComments(pageNumber = 0, numberOfComments = 10):Observable<UserComment[]>{
    
    let httpOptions = {
      params: new HttpParams({
        fromObject:{
          "pageNumber": pageNumber.toString(),
          "numberOfComments": numberOfComments.toString()
        }
      })
    }

    return this.http.get<UserComment[]>(this.allCommentsUrl, httpOptions);
  }

  //---Get all Comment by topic
  public getAllCommentsByTopic(topic: string, pageNumber = 0, numberOfComments = 5):Observable<UserComment[]>{
    
    let httpOptions = {
      params: new HttpParams({
        fromObject:{
          "pageNumber": pageNumber.toString(),
          "numberOfComments": numberOfComments.toString()
        }
      })
    }

    return this.http.get<UserComment[]>(this.topicCommentsUrl + topic, httpOptions);
  }

  //---Get all Comments for logged in user
  public getAllCommentForUser(pageNumber = 0, numberOfComments = 10): Observable<UserComment[]>{

    if(this.userService.isAuthenticated){

      let httpOptions = {
        params: new HttpParams({
          fromObject:{
            "pageNumber": pageNumber.toString(),
            "numberOfComments": numberOfComments.toString()
          }
        }),
        headers: new HttpHeaders({
          "Authorization" : "Bearer " + localStorage.getItem('jwt')
        })
      }
  
      return this.http.get<UserComment[]>(this.userCommentsUrl, httpOptions);

    }else{

      throw new Error("User Is not Authorized, Login to comment");

    }

  }

  //---Post UserComment
  public postComment(comment:UserComment): Observable<ServerMessage>{

    if(this.userService.isAuthenticated){

      let httpOptions = {
        headers: new HttpHeaders({
          "Authorization" : "Bearer " + localStorage.getItem('jwt')
        })
      }
  
      return this.http.post<ServerMessage>(this.postCommentsUrl, comment,httpOptions);

    }else{

      throw new Error("User Is not Authorized, Login to comment");
      
    }

  }

  //---Delete UserComment By user
  public deleteComment(id:string):Observable<ServerMessage>{

    
    if(this.userService.isAuthenticated){

      let httpOptions = {
        headers: new HttpHeaders({
          "Authorization" : "Bearer " + localStorage.getItem('jwt')
        }),

      }
  
      return this.http.delete<ServerMessage>(this.deleteCommentsUrl + id.toString() ,httpOptions);

    }else{

      throw new Error("User Is not Authorized, Login to comment");
      
    }

  }
  
}
