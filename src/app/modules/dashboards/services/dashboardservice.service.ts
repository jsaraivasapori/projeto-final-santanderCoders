import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiUrl = `${environment.apiUrl}/appointments/`;

  constructor(private http: HttpClient) {}

  getAppointment(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }
  createAppointment(appointment: Appointment): Observable<void> {
    return this.http.post<void>(this.apiUrl, appointment);
  }
  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }
  updateAppointment(id: string, appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, appointment);
  }

  cancelAppointment(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}cancel/${id}`, id);
  }

  doneAppointment(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}done/${id}`, id);
  }
}