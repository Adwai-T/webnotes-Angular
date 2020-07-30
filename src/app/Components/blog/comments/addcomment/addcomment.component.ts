import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ServerMessage } from 'src/app/interfaces/serverMessage';
import { UserComment } from 'src/app/interfaces/user-comment'; 

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit, OnDestroy {

  @Output() newCommentEvent: EventEmitter<string> = new EventEmitter();

  public commentStatus: ServerMessage;
  public textEvent: any;

  @Input() commentPostStatus: EventEmitter<UserComment | ServerMessage>;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.commentPostStatus.subscribe((data) => {

      if (data.hasOwnProperty('userName')) {

        this.commentStatus = {
          message: "Comment Added Successfully"
        }

        let currentUrl:string[] = this.router.url.split('/');
        currentUrl.shift();

        this.router.navigate(currentUrl)

        setTimeout(() => {
          this.commentStatus = null;
        }, 3000)

      } else {

        this.commentStatus = data;

        setTimeout(() => {
          this.commentStatus = null;
        }, 3000)

      }

    }, (error) => {

      this.commentStatus = {
        exception: "Error",
        message: error.message
      }

      setTimeout(() => {
        this.commentStatus = null;
      }, 3000)
    })
  }

  getValue(event) {
    this.textEvent = event;
  }

  getComment(textInputField): void {

    if (this.textEvent) {
      let textValue: string = this.textEvent.target.value;

      if (textValue) {

        if (textValue.length < 10) {

          this.textEvent.target.value = "";
          textInputField.value = "";
          this.commentStatus = {
            exception: "Error",
            message: "Please give us a longer comment to better understand you."
          }

          setTimeout(() => {
            this.commentStatus = null;
          }, 3000);

        } else {
          textInputField.value = "";
          this.newCommentEvent.emit(textValue);
        }

      } else {

        this.commentStatus = {
          exception: "Error",
          message: "Please Enter a comment"
        }

        setTimeout(() => {
          this.commentStatus = null;
        }, 3000);

        this.textEvent.target.value = "";
      }
    }else{

      this.commentStatus = {
        exception: "Error",
        message: "Please Enter a comment"
      }

      setTimeout(() => {
        this.commentStatus = null;
      }, 3000);

    }


  }

  ngOnDestroy(): void {
    this.commentPostStatus.unsubscribe();
  }

}
