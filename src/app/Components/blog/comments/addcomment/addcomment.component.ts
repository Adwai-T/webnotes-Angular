import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ServerMessage } from 'src/app/interfaces/serverMessage';
import { UserComment } from 'src/app/interfaces/user-comment';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit, OnDestroy{

  @Output() newCommentEvent:EventEmitter<string> = new EventEmitter();

  public commentStatus: ServerMessage;
  public textValue:string;

  @Input() commentPostStatus:EventEmitter<UserComment|ServerMessage>;

  constructor() { }

  ngOnInit(): void {

    this.commentPostStatus.subscribe((data)=>{
      
      if(data.hasOwnProperty('userName')){
        this.commentStatus = {
          message : "Comment Added Successfull"
        }
      }else{
        this.commentStatus = data;
      }

    }, (error)=>{

      this.commentStatus = {
        exception: "Error",
        message: error.message
      }
    })
  }

  getValue(event){
    this.textValue = event.target.value;
  }

  getComment(textInputField):void{

    if(this.textValue){

      if(this.textValue.length < 10){

        this.textValue = "";
        textInputField.value = "";
        this.commentStatus = {
          exception: "Error",
          message: "Please give us a longer comment to better understand you."
        }
  
      }else{
        textInputField.value = "";
        this.newCommentEvent.emit(this.textValue);
      }

    }else{

      this.commentStatus = {
        exception: "Error",
        message: "Please Enter a comment"
      }
      textInputField.value = "";
    }  
  }

  ngOnDestroy(): void {
    this.commentPostStatus.unsubscribe();
  }

}
