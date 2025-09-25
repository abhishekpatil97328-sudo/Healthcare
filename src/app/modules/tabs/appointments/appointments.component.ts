import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  patients = [
    {
      id: 1,
      patientId: 'P1001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1985-03-15',
      gender: 'Female',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@example.com',
      address: '123 Main St, Anytown, USA',
      primaryPhysician: 'Dr. Michael Chen',
      insurance: 'Blue Cross Blue Shield',
      status: 'active',
      lastVisit: '2024-01-15',
      department: 'cardiology',
      nextAppointment: '2024-02-15',
      appointmentTime: '10:00 AM',
      appointmentType: 'Follow-up',
      appointmentStatus: 'confirmed'
    },
    {
      id: 2,
      patientId: 'P1002',
      firstName: 'Robert',
      lastName: 'Williams',
      dateOfBirth: '1978-11-22',
      gender: 'Male',
      phone: '+1 (555) 987-6543',
      email: 'robert.williams@example.com',
      address: '456 Oak Ave, Somewhere, USA',
      primaryPhysician: 'Dr. Lisa Park',
      insurance: 'Aetna',
      status: 'active',
      lastVisit: '2024-01-10',
      department: 'neurology',
      nextAppointment: '2024-02-20',
      appointmentTime: '2:30 PM',
      appointmentType: 'Consultation',
      appointmentStatus: 'pending'
    },
    {
      id: 3,
      patientId: 'P1003',
      firstName: 'Emily',
      lastName: 'Davis',
      dateOfBirth: '1992-07-08',
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'emily.davis@example.com',
      address: '789 Pine Rd, Nowhere, USA',
      primaryPhysician: 'Dr. James Wilson',
      insurance: 'Cigna',
      status: 'inactive',
      lastVisit: '2023-12-05',
      department: 'orthopedics',
      nextAppointment: '2024-02-25',
      appointmentTime: '11:15 AM',
      appointmentType: 'Check-up',
      appointmentStatus: 'confirmed'
    },
    {
      id: 4,
      patientId: 'P1004',
      firstName: 'Michael',
      lastName: 'Brown',
      dateOfBirth: '1980-12-30',
      gender: 'Male',
      phone: '+1 (555) 234-5678',
      email: 'michael.brown@example.com',
      address: '321 Elm St, Anycity, USA',
      primaryPhysician: 'Dr. Michael Chen',
      insurance: 'UnitedHealthcare',
      status: 'active',
      lastVisit: '2024-01-08',
      department: 'cardiology',
      nextAppointment: '2024-02-18',
      appointmentTime: '9:45 AM',
      appointmentType: 'Follow-up',
      appointmentStatus: 'cancelled'
    },
    {
      id: 5,
      patientId: 'P1005',
      firstName: 'Jennifer',
      lastName: 'Miller',
      dateOfBirth: '1995-04-18',
      gender: 'Female',
      phone: '+1 (555) 345-6789',
      email: 'jennifer.miller@example.com',
      address: '654 Maple Dr, Yourcity, USA',
      primaryPhysician: 'Dr. Lisa Park',
      insurance: 'Kaiser Permanente',
      status: 'active',
      lastVisit: '2024-01-12',
      department: 'pediatrics',
      nextAppointment: '2024-02-22',
      appointmentTime: '3:00 PM',
      appointmentType: 'Vaccination',
      appointmentStatus: 'pending'
    }
  ];

  getConfirmedCount(): number {
    return this.patients.filter(patient => patient.appointmentStatus === 'confirmed').length;
  }

  getPendingCount(): number {
    return this.patients.filter(patient => patient.appointmentStatus === 'pending').length;
  }

  getCancelledCount(): number {
    return this.patients.filter(patient => patient.appointmentStatus === 'cancelled').length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  }

  cancelAppointment(patientId: number): void {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient && patient.appointmentStatus !== 'cancelled') {
      patient.appointmentStatus = 'cancelled';
    }
  }

  confirmAppointment(patientId: number): void {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient && patient.appointmentStatus === 'pending') {
      patient.appointmentStatus = 'confirmed';
    }
  }

  rescheduleAppointment(patientId: number): void {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      // Simple reschedule logic - in real app, this would open a modal
      const newDate = new Date(patient.nextAppointment);
      newDate.setDate(newDate.getDate() + 7);
      patient.nextAppointment = newDate.toISOString().split('T')[0];
      patient.appointmentStatus = 'pending';
    }
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}