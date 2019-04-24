import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Subject} from 'rxjs';

var httpOptions = {
  observe: 'body',
  withCredentials: true,
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})



export class RoleService {

  constructor(private _http: HttpClient) { }

emplist:Array<any>=[];
id:number=0;
  getRoledata() {
    return this.emplist;
  }
  private DataEmp=new Subject<any>();
  dataList=this.DataEmp.asObservable();

  postRoledata(body: any) {
   this.emplist.push({_id:this.id++,UserName:body.User,
    Mobile:body.Mobile,
    Email:body.Email,
    Date:body.Date,
    Description:body.Description,
    Country:body.Country.Country,Url:body.Url});
   
  }
 

}
