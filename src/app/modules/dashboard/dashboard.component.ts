// dashboard.component.ts

import { Component } from '@angular/core';
import {trigger, transition, style, animate,} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule],  
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent {
  // Dummy appointment data
  appointments = [
    {
      time: '09:00 AM',
      patient: 'John Doe',
      reason: 'Routine Checkup',
    },
    {
      time: '10:30 AM',
      patient: 'Emily Smith',
      reason: 'Blood Test',
    },
    {
      time: '01:00 PM',
      patient: 'Michael Brown',
      reason: 'Follow-up',
    },
    {
      time: '03:15 PM',
      patient: 'Sophia Lee',
      reason: 'Consultation',
    },
  ];
}
