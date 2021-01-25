import { Component, OnInit, ViewChild } from '@angular/core';

import { Question } from 'src/app/interfaces/question';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public topics: string[] = [
    "Java",
    "Utils",
    "Web",
    "Angular"
  ]

  public questions: Question[] = [];
  public Score: number;
  public selectedTopic:string;
  public quizNumber:number;
  public numberOfCorrectAnswers:number;
  public quizSubmitted:boolean;
  public questionArrayFromServerReturnEmpty:boolean;
  public loadingQuestions:boolean;
  public errorFetchingQuestions:boolean;
  
  private numberOfQuestionsAnswered: number;
  private answersSubmitted:boolean[];
  private numberOfQuestionsPerQuiz: number;
  private localQuizDetailsInfo: string[][];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionArrayFromServerReturnEmpty = false;
    this.questions = [];
    this.answersSubmitted = [];
    this.numberOfQuestionsPerQuiz = 3;
    this.selectedTopic = '';
    this.quizSubmitted = false;
    this.loadingQuestions = false;
    this.errorFetchingQuestions = false;
  }

  public setLocalStorageValue(topic:string, quizNumber:number):void{

    let localStorageQuizDetails:string[][]= JSON.parse(localStorage.getItem('quizDetails'));
    let hasTopic:boolean = false;

    if(localStorageQuizDetails){

      localStorageQuizDetails.forEach(topicInfo=>{

        if(topicInfo[0] === topic){
          hasTopic = true;
        }
      });
    }else{

      localStorageQuizDetails = [];
    }

    if(hasTopic){
      localStorageQuizDetails.forEach(topicInfo=>{

        if(topicInfo[0] === topic){
          topicInfo[1] = quizNumber.toString();
        }
      });
    }else{

      localStorageQuizDetails.push([topic, quizNumber.toString()]);
    }

    localStorage.setItem('quizDetails', JSON.stringify(localStorageQuizDetails));
  }

  public getLocalStorageValueForTopic(topic:string):number{

    let quizNumberFromLocalStorage = 0;

    if(localStorage.getItem('quizDetails')){

      let localStorageQuizDetails:string[][]= JSON.parse(localStorage.getItem('quizDetails'));
      

      localStorageQuizDetails.forEach((topicInfo ) =>{
        
        if(topicInfo[0] === topic){

          quizNumberFromLocalStorage = parseInt(topicInfo[1]);
          return ;
        }
      });
    }

    return quizNumberFromLocalStorage;
  }

  public allQuestionsAnswered(): boolean {
    return this.numberOfQuestionsAnswered === (this.questions.length - 1);
  }

  public onSelectedTopic(topic: string): void {

    this.questions = [];

    this.selectedTopic = topic;
    
    let quizNumberFromLocalStorage = this.getLocalStorageValueForTopic(topic);

    if(quizNumberFromLocalStorage > 0){

      this.quizNumber = quizNumberFromLocalStorage;
    }else{

      this.quizNumber = 1;
      this.setLocalStorageValue(topic, this.quizNumber);
    }

    this.getQuestionsByTopic();
  }

  private getQuestionsByTopic(): void{

    this.loadingQuestions = true;
    this.errorFetchingQuestions = false;
    this.questionArrayFromServerReturnEmpty = false;
    this.numberOfCorrectAnswers = 0;
    this.answersSubmitted = [];

    this.questionsService
      .getQuestionsByTopic(this.selectedTopic, this.quizNumber, this.numberOfQuestionsPerQuiz)
      .subscribe((data: Question[]) => {

        if(data.length < 1){
          this.questionArrayFromServerReturnEmpty = true;
          
        }else{
          this.questionArrayFromServerReturnEmpty = false;
          this.questions = data;
        }

        this.loadingQuestions = false;

    },(err)=>{

      this.errorFetchingQuestions = true;
      this.loadingQuestions = false;
    });
  }

  public onSubmitAnswerEvent(event){
    this.answersSubmitted[event.index] = event.isAnswerCorrect;
  }

  public onSubmitQuiz(): void {

    this.numberOfCorrectAnswers = 0;

    this.answersSubmitted.forEach((value)=>{

      if(value){
        this.numberOfCorrectAnswers++;
      }

    });
    this.quizSubmitted = true;
  }

  onRetryQuiz(){
    this.quizSubmitted = false;
    this.getQuestionsByTopic();
  }

  public onFetchPreviousQuiz():void{

    if(this.quizNumber > 1){
      this.quizSubmitted = false;
      this.quizNumber--;
      this.setLocalStorageValue(this.selectedTopic, this.quizNumber);
      this.getQuestionsByTopic();
    }

  }

  public onFetchNextQuiz():void{
    this.quizSubmitted = false;
    this.quizNumber++;
    this.getQuestionsByTopic();
    this.setLocalStorageValue(this.selectedTopic, this.quizNumber);
  }

  public resetProgressForTopic():void{
    this.quizNumber = 1;
    this.setLocalStorageValue(this.selectedTopic, this.quizNumber);
    this.getQuestionsByTopic(); 
  }

}
