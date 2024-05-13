import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'appointments'
    },
    {
        path: 'auth',
        component: AuthComponent,
        children :[
            {
                path: 'register',
                component: RegisterComponent
            },

            {
                path: 'login',
                component: LoginComponent
            }
        ]

    }
];
