import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {

  @Output() newCommentEvent:EventEmitter<string> = new EventEmitter();

  public placeHolderAndErrors:string = "Type your comment here";
  public textValue:string;

  constructor() { }

  ngOnInit(): void {
  }

  getValue(event){
    this.textValue = event.target.value;
  }

  getComment():void{

    if(this.textValue.length < 10){

      this.textValue = "";
      this.placeHolderAndErrors = "Please add a longer comment so that it is easier to understand."

    }else{
      this.newCommentEvent.emit(this.textValue);
    }
    
  }

}
