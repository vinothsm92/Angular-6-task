
import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

export const AppRoute: Routes = [


  { path: '', component: LoginComponent },
  {
    
    path: 'Home', component: HomeComponent, children: [
      {
        path: 'Role', component: RoleComponent, outlet: "FCS"
      },
      {
        path: 'User', component: UserComponent, outlet: "FCS"
      }
      
    ]
  },
  

  { path: '**', component: LoginComponent }

]


