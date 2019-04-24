
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, Pipe, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from '../app/user/user.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { RoleService } from '../app/role/role.service';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  UserMasters = []
  UserAddForm: FormGroup;
  cols: any[];
  EditUservisible: boolean = false;
  UserForm: FormGroup;
  Popuptitle: string;
  CountryEdit: any;
  UserDetails: any = {};

  UserIsApprovedByAdmin: string;
  UserIsActive: string;
  MasterKey: string;
  Countryies:any[]
  AddUserVisible: boolean = false;
   EmailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private _http: HttpClient, private _router: Router, private _UserService: UserService,
    private _MessageService: MessageService, private _RoleService: RoleService) {
      const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

      //forms
    this.UserForm = new FormGroup({
      'User': new FormControl('', Validators.required),
      'Description': new FormControl('', [Validators.required, Validators.maxLength(256)]),
      'Email': new FormControl('', [Validators.required, Validators.pattern(this.EmailPattern)// Validators.email
      ]),
      'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    'Country':new FormControl('', Validators.required),
    'Date':new FormControl('', Validators.required),
    'Url': new FormControl('', Validators.required )
    });

    this.UserAddForm = new FormGroup({
      'User': new FormControl('', Validators.required),
      'Description': new FormControl('', [Validators.required, Validators.maxLength(256)]),
      'Email': new FormControl('', [Validators.required, Validators.pattern(this.EmailPattern)// Validators.email
      ]),
      'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    'Country':new FormControl('', Validators.required),
    'Date':new FormControl('', Validators.required),
    'Url': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'UserName', header: 'Display Name' },
      { field: 'Email', header: 'Email' },
      { field: 'Mobile', header: 'Mobile' },
      { field: 'Country', header: 'Country' },
      { field: 'Date', header: 'Date' },
      { field: 'Description', header: 'Description' },
      { field: 'Url', header: 'Url' }
    ];
    this.Countryies=[{Country:'India'},{Country:'Asia'}];
    this.refresh();
    
    
  }
  
  refresh() {
    this.UserBind();

  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  //Add User to Local storage
  onAddUserSubmit() {
    if(this.UserAddForm.value.User==undefined||this.UserAddForm.value.Mobile==undefined||this.UserAddForm.value.Email==undefined||this.UserAddForm.value.Date==undefined||this.UserAddForm.value.Description==undefined||this.UserAddForm.value.Country==undefined||this.UserAddForm.value.User==""||this.UserAddForm.value.Mobile==""||this.UserAddForm.value.Email==""||this.UserAddForm.value.Date==""||this.UserAddForm.value.Description==""||this.UserAddForm.value.Country=="")
    {
      this._MessageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Fill all the mandatory fields' });
      this.validateAllFields(this.UserAddForm);
    }else{
    this._RoleService.postRoledata(this.UserAddForm.value)
        this._MessageService.add({ severity: 'success', summary: 'Success Message', detail: 'User Saved Successfully' });
        this.UserAddForm.reset();
        
        this.AddUserVisible = false
        this.refresh()}
   
  }

   
  ShowAddUserD() {
    this.UserAddForm.reset();
    this.AddUserVisible = true;
   
  }
  UserEdit:string;
  EmailEdit:string;
  DescriptionEdit:string;
  UrlEdit:string
  DateEdit:string;
  MobileEdit:string;

  //on edit get all the data
  ShowEdit(rowData) {
    
      this.EditUservisible = true;
      this.Popuptitle = `Edit User - ${rowData.UserName}`;
      //rowData.Role
     this.UserEdit=rowData.UserName;
      this.CountryEdit ={Country: rowData.Country};
      this.EmailEdit = rowData.Email;
      this.DescriptionEdit = rowData.Description;
      this.DateEdit = rowData.Date;
    this.MobileEdit=rowData.Mobile;
    this.UrlEdit=rowData.Url;

  }

  UserBind() {
    this.UserMasters =  this._RoleService.getRoledata();
  }


  onUpdateUser() {
    
    if(this.UserForm.value.User==undefined||this.UserForm.value.Mobile==undefined||this.UserForm.value.Email==undefined||this.UserForm.value.Date==undefined||this.UserForm.value.Description==undefined||this.UserForm.value.Country==undefined||this.UserForm.value.User==""||this.UserForm.value.Mobile==""||this.UserForm.value.Email==""||this.UserForm.value.Date==""||this.UserForm.value.Description==""||this.UserForm.value.Country=="")
    {
      this._MessageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Fill all the mandatory fields' });
      this.validateAllFields(this.UserForm);
    }else{
      this.UserForm.value._id = this.MasterKey;;
      this._UserService.UpdateRole(this.UserForm.value).subscribe(data => {
        if (data == "Un-Authenticated") {
          this._router.navigate(['/']);
        }
        else {
          this.EditUservisible = false;
          this._MessageService.add({ severity: 'success', summary: 'Success Message', detail: 'User Updated Successfully' });
          this.refresh()
        }
      },
        error => {
          console.error(error)
          this._MessageService.add({ severity: 'error', summary: 'Error Message', detail: error });
        }
      );

    }
  
  }
  Cancel(){
    this.EditUservisible = false;
    this.AddUserVisible = false;
  }

}
