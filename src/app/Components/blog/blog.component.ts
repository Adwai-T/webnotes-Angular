import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public util:boolean = false;
  public java:boolean = false;
  public web:boolean = false;
  public data:boolean = false;

  public divideRequired:boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.util = false;
    this.java = false;
    this.web = false;
    this.data = false;
  }

}
