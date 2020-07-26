import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommentsService } from 'src/app/services/comments/comments.service';
import { UserComment } from 'src/app/interfaces/user-comment';
import { ServerMessage } from 'src/app/interfaces/serverMessage';
import { UserService } from 'src/app/services/users/user.service';

interface SubTopic{
  title:string;
  linkToComponent:string;
  imageSrc:string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy{

  public comments: UserComment[];

  private commentsSubscription: Subscription;
  private commentsByTopicSubscription: Subscription;
  
  @Input() activeTopicSubscription:EventEmitter<SubTopic>;
  public activeTopic:SubTopic;

  public commentSuccessfulEvent:EventEmitter<UserComment|ServerMessage> = new EventEmitter();

  constructor(private commentsService:CommentsService, public userService: UserService) { }

  ngOnInit(): void {
    this.comments = [];

    this.activeTopicSubscription.subscribe((data:SubTopic)=>{

      this.activeTopic = data;
      this.getCommentByTopic(data.title.toLowerCase());

    },(error)=>{
      console.log(error, "Error while fetching comments for topic");
    });

  }

  public onNewCommentEvent(newComment){

    if(this.userService.isAuthenticated){

      let newUserComment:UserComment = {
        comment: newComment,
        topic: this.activeTopic.title.toLowerCase(),
        userName: this.userService.authenticatedUserDetails.userName
      }
    
      this.postComment(newUserComment);

    }
  }


  public getCommentByTopic(topic:string):void{
    
    this.commentsByTopicSubscription = this.commentsService.getAllCommentsByTopic(topic).subscribe((data)=>{

      this.comments = data;

      this.commentsByTopicSubscription.unsubscribe();

    },(error)=>{
      console.log(error);
    })
  }

  public comments_get():void{

    this.commentsSubscription = this.commentsService.getAllComments(0, 10).subscribe((data)=>{

      this.comments = data;
      this.commentsSubscription.unsubscribe();
    },
    (error)=>{
      console.log(error);
    });

  }

  public postComment(newUserComment:UserComment):void{

    let postCommentSubscription = this.commentsService.postComment(newUserComment).subscribe((data:UserComment|ServerMessage)=>{

      this.commentSuccessfulEvent.emit(data);
      postCommentSubscription.unsubscribe();

    },(error)=>{

      console.log(error, "error occured during posting comment");
      postCommentSubscription.unsubscribe();

    })

  }


  ngOnDestroy(): void {
    this.activeTopicSubscription.unsubscribe();
  }

}
