import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Question } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private getQuestionsUrl:string = 'https://adwait-webnotes.herokuapp.com/api/questions';
  private postQuestionsUrl:string = 'https://adwait-webnotes.herokuapp.com/api/questions/addquestions';
  private deleteQuestionsUrl:string = 'https://adwait-webnotes.herokuapp.com/api/questions/deletequestions';
  private putQuestionsUrl:string = 'https://adwait-webnotes.herokuapp.com/api/questions/deletequestions?id=123';

  constructor(private http: HttpClient) { }

  //--- get Questions
  public getQuestions(pageNumber:number, numberOfQuestions:number): Observable<Question[]>{

    let options = {
      params : new HttpParams({
        fromObject: {
          "page" : pageNumber.toString(),
          "size" : numberOfQuestions.toString()
        }
      })
    }

    return this.http.get<Question[]>(this.getQuestionsUrl, options);

  }

  //--- post Questions
  public addQuestions(){

    let options = {
      headers: new HttpHeaders({
        "Authorization" : "Bearer "+ localStorage.getItem('jwt')
      })
    }

  }

  //--- delete Questions
  public deleteQuestions(){

  }

  //--- put Questions
  public editQuestion(){

  }
}
