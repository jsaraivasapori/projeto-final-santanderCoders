import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { UserCredentials } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { Constants } from '../../../../commons/constants/constants.enum';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    RouterLink],
  templateUrl: './login.component.html',
  styleUrl: '../../auth.component.scss'
})

export class LoginComponent  implements OnInit{

  loginForm!: FormGroup

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm()
}

 private buildForm(): void{
  this.loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required])

  })
}

login() : void{
 
  const user: UserCredentials = this.loginForm.getRawValue();
  this.authService
    .login(user)
    .pipe(first())
    .subscribe({
      next: (res) => {
        localStorage.setItem(Constants.TOKEN_KEY, `Bearer ${res.token}`);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
      },
    });


}
}
