import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { first, Observable } from 'rxjs';
import { Appointments } from '../../models/dashboards.model';
import { Router, RouterModule } from '@angular/router';
import { DashboardserviceService } from '../../services/dashboardservice.service';

@Component({
  selector: 'app-list.appointment',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, HttpClientModule],
  templateUrl: './list.appointment.component.html',
  styleUrl: './list.appointment.component.scss',
})
export class ListAppointmentComponent implements OnInit {
  appointment?: Appointments[];

  observable = new Observable((observer) => {
    let counter = 0;
    setInterval(() => {
      observer.next(++counter);
    }, 1000);
  });
  Appointments: any;

  constructor(
    private dashboardserviceService: DashboardserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAppointments;
  }

  getAppointments(): void {
    this.dashboardserviceService
      .getAppointments()
      .pipe(first())
      .subscribe({
        next: (response: Appointments[]) => {
          this.appointment = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onDelete(id: string): void {
    this.dashboardserviceService
      .deleteAppointments(id)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.getAppointments();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  editAppointments(id: string): void {
    this.router.navigate(['appointment', 'edit', id]);
  }
}
