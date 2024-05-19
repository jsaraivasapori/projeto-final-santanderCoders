import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboardservice.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-add-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-dashboard.component.html',
  styleUrl: './add-dashboard.component.scss',
})
export class AddDashboardComponent {
  form!: FormGroup;

  id?: string;

  constructor(
    private dashboardService: DashboardService,
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
      specialty: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      obs: new FormControl(''),
    });
  }

  getAppointments(id: string): void {
    this.dashboardService
      .getAppointmentById(id)
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
    const appointment: Appointment = this.form.getRawValue();

    if (this.id) {
      this.updateAppointments(appointment);
      return;
    }

    this.createAppointments(appointment);
    this.router.navigate(['appointments', 'main']);
  }

  createAppointments(appointment: Appointment): void {
    this.dashboardService
      .createAppointment(appointment)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.router.navigate(['appointments', 'main']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateAppointments(appointment: Appointment): void {
    this.dashboardService
      .updateAppointment(this.id as string, appointment)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.router.navigate(['appointments', 'main']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
