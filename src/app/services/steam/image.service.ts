import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ImageService{

  private steamImageBaseUrl:string = "";

  constructor(private http:HttpClient) {}

  getSteamGameImageById(id:string): Observable<string>{
    return
  }
}