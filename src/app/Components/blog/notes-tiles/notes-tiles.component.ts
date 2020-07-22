import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notes-tiles',
  templateUrl: './notes-tiles.component.html',
  styleUrls: ['./notes-tiles.component.css']
})
export class NotesTilesComponent implements OnInit {

  @Input() imgSrc = 'src';
  @Input() tileTitle = 'Title';

  public imgtilesrc : string = this.imgSrc;
  public titletile : string = this.tileTitle;

  constructor() { }

  ngOnInit(): void {
    this.imgtilesrc= this.imgSrc;
    this.titletile = this.tileTitle;
  }

}
