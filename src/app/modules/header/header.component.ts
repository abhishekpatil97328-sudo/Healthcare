import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  isUserMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onSettings() {
    // Your logic to open settings
    console.log('Settings clicked');
  }

  onLogout() {
    console.log('Logout clicked');
  }
}
