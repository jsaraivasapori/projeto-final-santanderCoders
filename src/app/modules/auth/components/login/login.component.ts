import { Component, OnInit } from '@angular/core';
import {  
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials.model';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth.service';



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
  styleUrl: './login.component.scss'
})

export class LoginComponent  implements OnInit{

  loginForm!: FormGroup

  constructor(private authService: AuthService, private router: Router)

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
  //Capturar respostas do form

  const user : UserCredentials = this.loginForm.getRawValue()


}
}
