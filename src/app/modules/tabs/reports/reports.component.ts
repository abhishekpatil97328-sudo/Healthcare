import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Report {
  id: number;
  patientId: string;
  patientName: string;
  reportType: string;
  reportDate: string;
  generatedBy: string;
  status: 'completed' | 'pending' | 'in-progress';
  department: string;
  findings: string;
  recommendations: string;
  urgency: 'high' | 'medium' | 'low' | 'routine';
  attachments: number;
  labResults: {
    [key: string]: string;
  };
}

interface Filters {
  status: string;
  department: string;
  urgency: string;
  dateRange: string;
}

@Component({
  standalone: true,
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  reports: Report[] = [
    {
      id: 1,
      patientId: 'P1001',
      patientName: 'Sarah Johnson',
      reportType: 'Blood Test',
      reportDate: '2024-01-15',
      generatedBy: 'Dr. Michael Chen',
      status: 'completed',
      department: 'cardiology',
      findings: 'Normal cholesterol levels, slightly elevated blood sugar',
      recommendations: 'Maintain current diet and exercise routine',
      urgency: 'routine',
      attachments: 3,
      labResults: {
        hemoglobin: '14.2 g/dL',
        glucose: '108 mg/dL',
        cholesterol: '185 mg/dL'
      }
    },
    {
      id: 2,
      patientId: 'P1002',
      patientName: 'Robert Williams',
      reportType: 'MRI Scan',
      reportDate: '2024-01-10',
      generatedBy: 'Dr. Lisa Park',
      status: 'completed',
      department: 'neurology',
      findings: 'Mild disc degeneration in lumbar region',
      recommendations: 'Physical therapy recommended, follow-up in 3 months',
      urgency: 'medium',
      attachments: 5,
      labResults: {
        scanType: 'Lumbar Spine MRI',
        findings: 'L4-L5 disc degeneration',
        impression: 'Mild spinal stenosis'
      }
    },
    {
      id: 3,
      patientId: 'P1003',
      patientName: 'Emily Davis',
      reportType: 'X-Ray Report',
      reportDate: '2023-12-05',
      generatedBy: 'Dr. James Wilson',
      status: 'completed',
      department: 'orthopedics',
      findings: 'Healed fracture in right wrist',
      recommendations: 'No further treatment needed',
      urgency: 'low',
      attachments: 2,
      labResults: {
        area: 'Right Wrist',
        findings: 'Complete fracture healing',
        impression: 'Normal bone alignment'
      }
    },
    {
      id: 4,
      patientId: 'P1004',
      patientName: 'Michael Brown',
      reportType: 'EKG Report',
      reportDate: '2024-01-08',
      generatedBy: 'Dr. Michael Chen',
      status: 'pending',
      department: 'cardiology',
      findings: 'Results awaiting cardiologist review',
      recommendations: 'Pending analysis',
      urgency: 'high',
      attachments: 1,
      labResults: {
        rhythm: 'Sinus rhythm',
        rate: '72 bpm',
        interpretation: 'Pending review'
      }
    },
    {
      id: 5,
      patientId: 'P1005',
      patientName: 'Jennifer Miller',
      reportType: 'Pediatric Checkup',
      reportDate: '2024-01-12',
      generatedBy: 'Dr. Lisa Park',
      status: 'completed',
      department: 'pediatrics',
      findings: 'Healthy development, up-to-date on vaccinations',
      recommendations: 'Next checkup in 6 months',
      urgency: 'routine',
      attachments: 4,
      labResults: {
        height: '95th percentile',
        weight: '90th percentile',
        development: 'Normal progression'
      }
    },
    {
      id: 6,
      patientId: 'P1002',
      patientName: 'Robert Williams',
      reportType: 'Follow-up Consultation',
      reportDate: '2024-01-20',
      generatedBy: 'Dr. Lisa Park',
      status: 'in-progress',
      department: 'neurology',
      findings: 'Patient reports improvement with physical therapy',
      recommendations: 'Continue current treatment plan',
      urgency: 'medium',
      attachments: 2,
      labResults: {
        painLevel: 'Reduced from 7/10 to 3/10',
        mobility: 'Improved range of motion',
        assessment: 'Positive response to treatment'
      }
    }
  ];

  filters: Filters = {
    status: 'all',
    department: 'all',
    urgency: 'all',
    dateRange: 'all'
  };

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  }

  getUrgencyClass(urgency: string): string {
    switch (urgency) {
      case 'high':
        return 'urgency-high';
      case 'medium':
        return 'urgency-medium';
      case 'low':
        return 'urgency-low';
      case 'routine':
        return 'urgency-routine';
      default:
        return 'urgency-routine';
    }
  }

  get filteredReports() {
    return this.reports.filter(report => {
      const statusMatch = this.filters.status === 'all' || report.status === this.filters.status;
      const departmentMatch = this.filters.department === 'all' || report.department === this.filters.department;
      const urgencyMatch = this.filters.urgency === 'all' || report.urgency === this.filters.urgency;
      
      return statusMatch && departmentMatch && urgencyMatch;
    });
  }

  getStats() {
    const total = this.reports.length;
    const completed = this.reports.filter(r => r.status === 'completed').length;
    const pending = this.reports.filter(r => r.status === 'pending').length;
    const inProgress = this.reports.filter(r => r.status === 'in-progress').length;
    
    return { total, completed, pending, inProgress };
  }

  downloadReport(reportId: number): void {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      // Simulate download
      console.log(`Downloading report: ${report.reportType} for ${report.patientName}`);
      alert(`Downloading ${report.reportType} report for ${report.patientName}`);
    }
  }

  shareReport(reportId: number): void {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      // Simulate share functionality
      alert(`Sharing ${report.reportType} report for ${report.patientName}`);
    }
  }

  updateFilter(filterType: keyof Filters, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.filters[filterType] = selectElement.value;
    }
  }

  getLabResults(report: Report): { key: string; value: string }[] {
    return Object.entries(report.labResults).map(([key, value]) => ({
      key: this.formatKey(key),
      value
    }));
  }

  private formatKey(key: string): string {
    // Convert camelCase or snake_case to Title Case
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}