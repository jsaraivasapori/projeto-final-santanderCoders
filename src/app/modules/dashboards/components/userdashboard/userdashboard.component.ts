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
import { ConfirmationModalComponent } from '../../../../commons/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss',
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
  ],
})
export class UserdashboardComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject();
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  appointments?: Appointment[];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
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
          console.log(err);
        },
      });
  }

  openDialog(id: string): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      disableClose: true,
      data: {
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

  redirectToAdd(): void {
    this.router.navigate(['appointments', 'add']);
  }

  editProduct(id: string) {
    this.router.navigate(['appointments', 'edit', id]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
