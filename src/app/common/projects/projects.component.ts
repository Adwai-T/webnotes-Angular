import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects = [
    // {
    //   langImg : "assets/images/languages/.png",
    //   title : "",
    //   subtitle : "",
    //   image : "assets/images/projects/.png",
    //   description : "",
    //   gitLink : "https://github.com/Adwai-T/"
    // },
    {
      langImg : "assets/images/languages/java.png",
      title : "JavaSteam",
      subtitle : "Steam Trade Bot implemented in Java",
      image : "assets/images/projects/java_steam.png",
      description : "Automates Steam trades. Accepts or Declines trades based on Item values saved on the Mongodb. " +
      "Saves Trade operation data to Mongodb.",
      gitLink : "https://github.com/Adwai-T/JavaSteam"
    },
    {
      langImg : "assets/images/languages/Spring.png",
      title : "Website",
      subtitle : "Spring Boot Backend",
      image : "assets/images/projects/website2.png",
      description : "Handles Signup/Login credentials and jwt processing, is connected to Postgre database." + 
      "Handles comments accoring to page and sections, connected to a Mongodb." +
      "Handles Quiz.",
      gitLink : "https://github.com/Adwai-T/webnotes"
    },
    {
      langImg : "assets/images/languages/angular.png",
      title : "Website",
      subtitle : "FrontEnd/Angular app",
      image : "assets/images/projects/website.png",
      description : "This website that you are currently are viewing is made with Angular 9.",
      gitLink : "https://github.com/Adwai-T/webnotes-Angular"
    },
    {
      langImg : "assets/images/languages/git.png",
      title : "GitHub",
      subtitle : "My Github Repositories",
      image : "assets/images/projects/github.png",
      description : "There are some more projects on my github. Most of them, are in active development.",
      gitLink : "https://github.com/Adwai-T/"
    },
  ];

  constructor() { }

  ngOnInit(): void {
         
  }
  

}
