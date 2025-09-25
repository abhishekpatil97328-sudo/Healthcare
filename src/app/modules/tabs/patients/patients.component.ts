// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';

// interface Patient {
//   id: number;
//   name: string;
//   age: number;
//   condition: string;
// }

// @Component({
//   selector: 'app-patients',
//     imports: [CommonModule],  

//   templateUrl: './patients.component.html',
//   styleUrls: ['./patients.component.css']
// })
// export class PatientsComponent implements OnInit {
//   patients: Patient[] = [];

//   ngOnInit(): void {
//     // Simulated patient data
//     this.patients = [
//       { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension' },
//       { id: 2, name: 'Jane Smith', age: 60, condition: 'Diabetes' },
//       { id: 3, name: 'Alice Johnson', age: 30, condition: 'Asthma' }
//     ];
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: number;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  primaryPhysician: string;
  insurance: string;
  status: 'active' | 'inactive';
  lastVisit: string;
  department: string;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  showPatientModal: boolean = false;

  // Filter properties
  searchTerm: string = '';
  statusFilter: string = 'all';
  departmentFilter: string = 'all';
  sortBy: string = 'name';
  sortAsc: boolean = true;

  // Statistics
  totalPatients: number = 0;
  activePatients: number = 0;
  newThisMonth: number = 0;

  ngOnInit() {
    this.loadPatients();
    this.calculateStatistics();
  }

  loadPatients() {
    // Mock data - in real application, this would come from a service
    this.patients = [
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
        department: 'cardiology'
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
        department: 'neurology'
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
        department: 'orthopedics'
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
        department: 'cardiology'
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
        department: 'pediatrics'
      }
    ];

    this.applyFilters();
  }

  calculateStatistics() {
    this.totalPatients = this.patients.length;
    this.activePatients = this.patients.filter(p => p.status === 'active').length;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.newThisMonth = this.patients.filter(p => {
      const visitDate = new Date(p.lastVisit);
      return visitDate.getMonth() === currentMonth && visitDate.getFullYear() === currentYear;
    }).length;
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.patients.filter(patient => {
      const matchesSearch = !this.searchTerm || 
        patient.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.primaryPhysician.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.statusFilter === 'all' || patient.status === this.statusFilter;
      const matchesDepartment = this.departmentFilter === 'all' || patient.department === this.departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });

    // Sort patients
    filtered = this.sortPatientsArray(filtered, this.sortBy, this.sortAsc);

    this.filteredPatients = filtered;
    this.calculateStatistics();
  }

  sortPatients(criteria: string) {
    if (this.sortBy === criteria) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortBy = criteria;
      this.sortAsc = true;
    }
    this.applyFilters();
  }

  private sortPatientsArray(patients: Patient[], criteria: string, ascending: boolean): Patient[] {
    return patients.sort((a, b) => {
      let comparison = 0;

      switch (criteria) {
        case 'name':
          comparison = a.lastName.localeCompare(b.lastName);
          break;
        case 'date':
          comparison = new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }

      return ascending ? comparison : -comparison;
    });
  }

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
  }

  viewPatientDetails(patient: Patient) {
    this.selectedPatient = patient;
    this.showPatientModal = true;
  }

  editPatient(patient: Patient) {
    // In a real application, this would open an edit form/modal
    console.log('Edit patient:', patient);
    alert(`Edit functionality for ${patient.firstName} ${patient.lastName} would open here.`);
  }

  deletePatient(patient: Patient) {
    if (confirm(`Are you sure you want to delete ${patient.firstName} ${patient.lastName}?`)) {
      // In a real application, this would call a service to delete the patient
      this.patients = this.patients.filter(p => p.id !== patient.id);
      this.applyFilters();
      this.calculateStatistics();
    }
  }

  openAddPatientModal() {
    // In a real application, this would open a modal/form to add a new patient
    alert('Add New Patient functionality would open here.');
  }

  closeModal() {
    this.showPatientModal = false;
    this.selectedPatient = null;
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}