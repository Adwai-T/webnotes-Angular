import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Question } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private baseUrl:string = "https://adwait-webnotes.herokuapp.com";
  private getQuestionsUrl:string = this.baseUrl + '/api/questions';
  private getQuestionsByTopicUrl:string = this.baseUrl + '/api/questions/by/'
  private postQuestionsUrl:string = this.baseUrl + '/api/questions/addquestions';
  private deleteQuestionsUrl:string = this.baseUrl + '/api/questions/deletequestions';
  private putQuestionsUrl:string = this.baseUrl + '/api/questions/';

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

  //---get Questions by Topic
  public getQuestionsByTopic(topic:string, pageNumber:number, numberOfQuestions:number): Observable<Question[]>{

    //---Because on server side pageNumber are counted from zero.
    pageNumber = pageNumber - 1;

    let options = {
      params : new HttpParams({
        fromObject: {
          "page" : pageNumber.toString(),
          "size" : numberOfQuestions.toString()
        }
      })
    }

    return this.http.get<Question[]>(this.getQuestionsByTopicUrl + topic, options);

  }

  //--- post Questions
  public addQuestions(questions:Question[]):Observable<Question[]>{

    let options = {
      headers: new HttpHeaders({
        "Authorization" : "Bearer "+ localStorage.getItem('jwt')
      })
    }

    return this.http.post<Question[]>(this.postQuestionsUrl, questions, options);
  }

  //--- delete Questions
  public deleteQuestions(questionId:string): Observable<Question>{

    let options = {
      headers: new HttpHeaders({
        "Authorization" : "Bearer "+ localStorage.getItem('jwt')
      }),
      params: new HttpParams({
        fromObject: {
          id : questionId
        }
      })
    }

    return this.http.delete<Question>(this.deleteQuestionsUrl, options);
  }

  //--- put Questions
  public editQuestion(questionId:string, question:Question):Observable<Question>{
    
    let options = {
      headers: new HttpHeaders({
        "Authorization" : "Bearer "+ localStorage.getItem('jwt')
      })
    }

    return this.http.put<Question>(this.putQuestionsUrl + questionId, question, options);
  }
}
