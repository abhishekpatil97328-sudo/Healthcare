import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserMenuOpen = false;

  constructor(private router: Router) {}

  // Add navigation methods
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToPatients() {
    this.router.navigate(['/patients']);
  }

  navigateToAppointments() {
    this.router.navigate(['/appointments']);
  }

  navigateToReports() {
    this.router.navigate(['/reports']);
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onSettings() {
    this.isUserMenuOpen = false;
    // Handle settings
  }

  onLogout() {
    this.isUserMenuOpen = false;
    // Handle logout
  }
}