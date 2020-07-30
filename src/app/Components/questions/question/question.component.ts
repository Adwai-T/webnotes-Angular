import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Question } from 'src/app/interfaces/question';

interface OutputAnswerCorrect{
  index:number;
  isAnswerCorrect:boolean;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public answerDescriptionActive:boolean = true;
  public selectedAnswer:string = '';
  public disabled:boolean = false;

  @Input() question: Question;
  @Input() index:number;

  @Output() onSubmitAnswerEvent:EventEmitter<OutputAnswerCorrect> = new EventEmitter();

  public wasAnswerCorrect: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.answerDescriptionActive  = true;
    this.wasAnswerCorrect = false;
  }

  getSelectedAnswer(answer):void{
    this.selectedAnswer = answer;
    this.answerDescriptionActive = false;
    this.disabled = true;
    this.wasAnswerCorrect = this.selectedAnswer === this.question.answers[this.question.answer - 1];
    
    this.onSubmitAnswerEvent.emit({
      index: this.index,
      isAnswerCorrect: this.wasAnswerCorrect
    });
  }

}
