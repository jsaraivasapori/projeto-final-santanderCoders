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
import { Appointments } from '../../models/dashboards.model';
import { DashboardserviceService } from '../../services/dashboardservice.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add.appointment',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add.appointment.component.html',
  styleUrl: './add.appointment.component.scss',
})
export class AddAppointmentComponent implements OnInit {
  form!: FormGroup;

  id?: string;

  constructor(
    private dashboardserviceService: DashboardserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getAppointments(this.id);
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      specialty: new FormControl(null, [Validators.required]),
      doctor: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      obs: new FormControl(null, [Validators.required]),
    });
  }

  getAppointments(id: string): void {
    this.dashboardserviceService
      .getAppointmentsById(id)
      .pipe(first())
      .subscribe({
        next: (appointment) => {
          this.form.patchValue(appointment);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSave(): void {
    const appointment: Appointments = this.form.getRawValue();

    if (this.id) {
      this.updateAppointments(appointment);
      return;
    }

    this.createAppointments(appointment);
  }

  createAppointments(appointment: Appointments): void {
    this.dashboardserviceService
      .saveAppointments(appointment)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.router.navigate(['dashboards', 'list.appointment']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateAppointments(appointment: Appointments): void {
    this.dashboardserviceService
      .updateAppointments(this.id as string, appointment)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.router.navigate(['dashboards', 'list.appointment']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
