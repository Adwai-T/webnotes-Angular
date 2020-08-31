import { AngularComponent } from '../notes/webdevelopment/angular/angular.component';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-code-marking',
    template: '',
    styles: []
  })
export class CodeMarkingComponent{

    constructor(private httpClient: HttpClient){}

    private getFileFromServer(filePath:string):Observable<string>{

        return this.httpClient.get(filePath, { responseType: 'text'});
    }
}

