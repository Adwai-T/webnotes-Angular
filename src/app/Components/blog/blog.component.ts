import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

interface Topic {
  topic:string;
  active:boolean;
  imageSrc:string;
  subTopics: SubTopic[];
}

interface SubTopic{
  title:string;
  imageSrc:string;
  linkToComponent?:string;
  linkToFile?:string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public blogPage:string;
  public contentFromComponents:boolean;
  public contentFromFile:boolean;
  public contentPage:string;
  public contentReady:boolean;

  //---Do not leave space in topic or subtopic title. They may cause problem fetching comments for them.
  public topics:Topic[] = [
    {
      topic : "Java",
      active : false,
      imageSrc : 'assets/images/languages/Spring.png',
      subTopics : [ 
        {
          title: "Spring",
          imageSrc: "assets/images/languages/maven.png",
          linkToFile: "assets/pages/notes/_spring.txt"
        },
        {
          title: "Threads",
          imageSrc: "assets/images/languages/Threads.png",
          linkToFile: "assets/pages/notes/_javathreads.txt"
        }
      ]
    },
    {
      topic : "WebDev",
      active : false,
      imageSrc : 'assets/images/languages/html.png',
      subTopics : [ 
        {
          title: "HTML",
          imageSrc: "assets/images/languages/html.png",
          linkToFile: "assets/pages/notes/_html.txt"
        },
        {
          title: "CSS",
          imageSrc: "assets/images/languages/css.png",
          linkToFile: "assets/pages/notes/_css.txt"
        },
        {
          title: "JavaScript",
          imageSrc: "assets/images/languages/javascript.png",
          linkToFile: "assets/pages/notes/_javascript.txt"
        },
        {
          title: "Angular",
          imageSrc: "assets/images/languages/angular.png",
          linkToFile: "assets/pages/notes/_angular.txt"
        }
      ]
    },
    // {
    //   topic : "DataBases",
    //   active : false,
    //   imageSrc : '/../../../../assets/images/languages/database.png',
    //   subTopics : [ 

    //   ]
    // },
    {
      topic : "Utils",
      active : false,
      imageSrc : 'assets/images/languages/utilities.png',
      subTopics : [
        {
          title: "Git",
          imageSrc: "assets/images/languages/git.png",
          linkToComponent: "/blog/util/git"
        },
        {
          title: "Heroku",
          imageSrc: "https://img.icons8.com/nolan/128/heroku.png",
          linkToComponent: "/blog/util/heroku"
        },
        {
          title: "Maven",
          imageSrc: "assets/images/languages/maven.png",
          // linkToComponent: "/blog/util/maven"
          linkToFile: "assets/pages/notes/_maven.txt"
        },
        {
          title: "MongoDB",
          imageSrc: "assets/images/languages/mongodb.png",
          linkToFile: "assets/pages/notes/_mongodb.txt"
        },
        {
          title: "SQL",
          imageSrc: "/../../../../assets/images/languages/SQL.png",
          linkToFile: "assets/pages/notes/_sql.txt"
        }
      ]
    },
  ]

  public subTopics: SubTopic[] = [];

  public activeSubTopicSubscription: EventEmitter<SubTopic> = new EventEmitter();

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit(): void {

    this.blogPage = '';

    //---Need to navigate to blog for initalizing other component contained
    //--- Directly Going to the page cause subscriptions and other data to not be ready.
    if(this.router.url !== "/blog"){
      
      this.router.navigate(["/blog"]);

    }
  }

  public setActiveTopic(topicTitle:string):void{
  
    this.topics.forEach((topic:Topic)=>{

      if(topic.topic !== topicTitle){

        topic.active = false;

      }else{

        if(topic.active === true){

          topic.active = false;
          this.subTopics = [];

        }else{

          topic.active = true;
          this.subTopics = topic.subTopics;

        }
      }

    });
  }

  public setAllTopicsToNotActive():void{

    this.topics.forEach((topic)=>{
      topic.active = false;
    });
  }

  public setSubTopicActive(subTopic: SubTopic){
    this.activeSubTopicSubscription.emit(subTopic);

    if(subTopic.hasOwnProperty('linkToComponent')){
      this.contentFromFile = false;
      this.contentFromComponents = true;
    }

    if(subTopic.hasOwnProperty('linkToFile')){
      this.getFileFromServer(subTopic.linkToFile);
    }
  }

  public getFileFromServer(filePath:string):void{

    this.contentReady = false;
    this.contentFromFile = true;
    this.contentFromComponents = false;

    this.httpClient.get(filePath , { responseType: 'text' }).subscribe(data => {
      this.contentPage = data;
      this.contentReady = true;
    },
    (error) =>{

      this.contentPage = "Sorry Could not fetch the page. \
      Please try again after some time or try reloading. \
      Thank you for your patience";

      this.contentReady = true;
    })    
  }

}
