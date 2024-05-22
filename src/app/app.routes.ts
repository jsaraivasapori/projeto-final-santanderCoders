import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { MainDashboardComponent } from './modules/dashboards/components/main-dashboard/main-dashboard.component';
import { DashboardComponent } from './modules/dashboards/dashboard.component';
import { AddDashboardComponent } from './modules/dashboards/components/add-dashboard/add-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
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
    canActivate:[authGuard],
    children: [
      {
        path: 'main',
        component: MainDashboardComponent,
      },
      {
        path: 'add',
        component: AddDashboardComponent,
      },
      {
        path: 'edit/:id',
        component: AddDashboardComponent,
      },
    ],
  },
  {
    path:`**`,
    redirectTo: 'auth/login', 
  }
];
