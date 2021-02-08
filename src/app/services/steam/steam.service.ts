import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Accept } from 'src/app/interfaces/accept';
import { ServerMessage } from 'src/app/interfaces/serverMessage';

@Injectable({
  providedIn: 'root',
})
export class SteamService {
  private baseUrl: string = 'https://adwait-webnotes.herokuapp.com/steam';
  private getAcceptedItemsUrl:string = '/accept';
  private updateAcceptedItemsUrl:string = '/accept/update';
  // https://steamcommunity.com/inventory/<Steam64Id>/<appid>/<contextid>?l=english&count=5000
  private inventoryUrl:string = "https://steamcommunity.com/inventory";

  constructor(private http: HttpClient) {}

  //---Get the items that I have for trade.
  getAcceptedItems(
    pageNumber: number = 1,
    numberOfItemsPerPage: number = 20
  ): Observable<Accept[]> {
    let options = {
      params: new HttpParams({
        fromObject: {
          pageNumber: pageNumber.toString(),
          ' numberOfItems': numberOfItemsPerPage.toString(),
        },
      }),
    };
    return this.http.get<Accept[]>(
      this.baseUrl + this.getAcceptedItemsUrl,
      options
    );
  }

  //---Update the list of the items items
  updateAccepedItems(accept: Accept): Observable<Accept> {
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      }),
    };
    return this.http.put<Accept>(
      this.baseUrl + this.updateAcceptedItemsUrl,
      accept,
      options
    );
  }

  //---Delete an Item form the accepts list.
  deleteAcceptedItems(accepts: Accept[]): Observable<ServerMessage> {
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      }),
    };
    return this.http.delete<ServerMessage>(
      this.baseUrl + this.updateAcceptedItemsUrl + accepts + options
    );
  }

  //---Get player inventory
  getPlayerInventory(steamId64:string, appid:string, context:string): Observable<Object>{
    let options = {
      // headers : new HttpHeaders({
      //   Accept: '*/*',
      // }), 
      params: new HttpParams({
        fromObject:{
          l:'english',
          count:'5000'
        }
      })
    }

    return this.http.get(this.inventoryUrl+'/'+steamId64+'/'+appid+'/'+context, options);
  }
}
