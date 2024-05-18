import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/user-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.API_URL}/auth`
 

  constructor(private http: HttpClient) {}

 
  
}
