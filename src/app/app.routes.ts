import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { UserdashboardComponent } from './modules/dashboards/components/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './modules/dashboards/components/admindashboard/admindashboard.component';
import { DashboardComponent } from './modules/dashboards/dashboard.component';
import { AddDashboardComponent } from './modules/dashboards/components/add-dashboard/add-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full',
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
    component: DashboardComponent,
    children: [
      {
        path: 'admin',
        component: AdmindashboardComponent,
      },

      {
        path: 'user',
        component: UserdashboardComponent,
      },
      {
        path: 'add',
        component: AddDashboardComponent,
      },
    ],
  },
];
