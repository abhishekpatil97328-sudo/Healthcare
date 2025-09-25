import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AppointmentsComponent } from './modules/tabs/appointments/appointments.component';
import { PatientsComponent } from './modules/tabs/patients/patients.component';
import { ReportsComponent } from './modules/tabs/reports/reports.component';

export const routes: Routes = [
     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '**', redirectTo: 'dashboard' }
];
