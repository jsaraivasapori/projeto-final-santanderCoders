import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Subject, first } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../../services/dashboardservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from '../../../../commons/modals/confirmation-modal/confirmation-modal.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Constants } from '../../../../commons/constants/constants.enum';

import { InformationalModalComponent } from '../../../../commons/modals/informational-modal/informational-modal.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatTableModule,
  ],
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject();
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  appointments?: Appointment[] = [];

  appointmentsDataSource = new MatTableDataSource<Appointment>(
    this.appointments
  );
  displayedColumns: string[] = [
    'specialty',
    'doctor',
    'date',
    'time',
    'obs',
    'status',
    'actions',
  ];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,

    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAppointment();
  }

  getAppointment(): void {
    this.dashboardService
      .getAppointment()
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.appointments = response;
          this.appointmentsDataSource = new MatTableDataSource<Appointment>(
            this.appointments
          );
          console.log(this.appointments);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onDelete(id: string): void {
    this.dashboardService
      .deleteAppointment(id)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.getAppointment();
        },
        error: (err) => {
          this.errorDialog(Constants.ERROR, err.error.message);
        },
      });
  }

  onCancel(id: string): void {
    this.dashboardService
      .cancelAppointment(id)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.getAppointment();
        },
        error: (err) => {
          this.errorDialog(Constants.ERROR, err.error.message);
        },
      });
  }

  onDone(id: string): void {
    this.dashboardService
      .doneAppointment(id)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.getAppointment();
        },
        error: (err) => {
          this.errorDialog(Constants.ERROR, err.error.message);
        },
      });
  }

  setCancelAppointment(id: string): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      disableClose: true,
      data: {
        action: Constants.CANCEL,
        id,
      },
    });
    dialog
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.onCancel(id);
        }
      });
  }

  setDoneAppointment(id: string): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      disableClose: true,
      data: {
        action: Constants.SET_AS_DONE,
        id,
      },
    });
    dialog
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.onDone(id);
        }
      });
  }

  openDialog(id: string): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      disableClose: true,
      data: {
        action: Constants.DELETE,
        id,
      },
    });
    dialog
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.onDelete(id);
        }
      });
  }

  errorDialog(title: string, message: string): void {
    this.dialog.open(InformationalModalComponent, {
      data: {
        title: title,
        message: message,
      },
    });
    this.dialog.closeAll;
  }

  redirectToAdd(): void {
    this.router.navigate(['appointments', 'add']);
  }

  editAppointment(id: string) {
    this.router.navigate(['appointments', 'add', id]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  isAdminUser(): boolean {
    return this.authService.isAdminUser();
  }
}
