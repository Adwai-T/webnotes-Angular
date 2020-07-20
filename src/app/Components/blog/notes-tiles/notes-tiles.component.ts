import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-tiles',
  templateUrl: './notes-tiles.component.html',
  styleUrls: ['./notes-tiles.component.css']
})
export class NotesTilesComponent implements OnInit {

  getLink:string = "/blog";

   imgtilesrc : string = '../../../assets/images/cat.jpg';
   titletile : string = "Title";
   descriptiontile = "This is a description. Here we will place a short description.";

  constructor() { }

  ngOnInit(): void {
  }

}
