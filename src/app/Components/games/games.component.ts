import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  public canvasWidth: number = 720;
  public canvasHeight: number = 480;
  public isCanvasReady:boolean = true;

  @ViewChild('canvas')
  canvas: ElementRef; 

  constructor(){}
  
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.isCanvasReady = true;
  }

  public readyCanvas(){
    console.log("readyCanvas");
    console.log(this.canvas);
    try{
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(100, 100, 25, 50);

      let canvasImageSource = new Image();
      canvasImageSource.src ='../../../assets/images/languages/angular.png';
      this.ctx.drawImage(canvasImageSource, 10, 20);

      this.isCanvasReady = true;
    }catch(err){
      console.error(err);
    }
    
    console.log("readyCanvas_ready");
  }
}
