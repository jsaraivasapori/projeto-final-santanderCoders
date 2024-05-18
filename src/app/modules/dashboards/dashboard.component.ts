import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../commons/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
