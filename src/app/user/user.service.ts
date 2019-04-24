import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  getRoledata(): Observable<any> {
    return this._http.get('http://localhost:8085/GetUserInfo', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  UpdateRole(body): Observable<any> {
    return this._http.put('http://localhost:8085/UpdateUserInfo', body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

}
