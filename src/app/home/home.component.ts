import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleComponent } from '../role/role.component';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor() { 
  
    
  }
   
   
  ngOnInit() {

  }

  


}
