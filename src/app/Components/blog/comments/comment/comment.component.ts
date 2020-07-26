import { Component, OnInit, Input } from '@angular/core';

import { UserComment } from 'src/app/interfaces/user-comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() userComment:UserComment;

  public color = "";
  private colorArray: string[] = ['seagreen', 'violet','magenta',  "red", "darkblue", "green", "darkseagreen", "purple", "orange", "black"  ]

  public date: string;

  constructor() { }

  ngOnInit(): void {

    let number = Math.floor(Math.random() * 10);

    this.color = "color:" + this.colorArray[number];
  }

}
