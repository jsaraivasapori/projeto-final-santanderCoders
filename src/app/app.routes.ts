import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { UserdashboardComponent } from './modules/dashboards/components/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './modules/dashboards/components/admindashboard/admindashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },

  {
    path: 'appointments',
    children: [
      {
        path: 'admin',
        component:AdmindashboardComponent ,
      },

      {
        path: 'user',
        component: UserdashboardComponent,
      },
    ],
  },
];
