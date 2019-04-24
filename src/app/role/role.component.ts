import { Component, OnInit, Pipe, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationStart,Router, NavigationEnd } from '@angular/router';
import { RoleService } from '../role/role.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { browserRefresh } from '../app.component';
 
export interface role {
  Role: String,
  Description: String,
  IsActive: Boolean
}
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
  
  constructor(private _http: HttpClient, private _router: Router, private _RoleService: RoleService, private _MessageService: MessageService) {

   
  }

 
  ngOnInit() {
    
  
 
  }
  

}
