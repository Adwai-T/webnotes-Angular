import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  protected navBar: string = 'This is a NavBar';

  constructor() { }

  ngOnInit(): void {
  }

}
