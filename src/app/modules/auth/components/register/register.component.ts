import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { User, UserCredentials } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../../auth.component.scss'
})
export class RegisterComponent  implements OnInit{

  registerForm!: FormGroup

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm()
}

 private buildForm(): void{
  this.registerForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required]),
    role: new FormControl(null,[Validators.required])


  })
}

register(): void {
  const user: User = this.registerForm.getRawValue();
  this.authService
    .register(user)
    .pipe(first())
    .subscribe({
      complete: () => {
        this.router.navigate(['auth', 'login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
}
}