import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

interface DialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-informational-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './informational-modal.component.html',
  styleUrl: './informational-modal.component.scss',
})
export class InformationalModalComponent {
  constructor(
    public dialogRef: MatDialogRef<InformationalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
