import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/header/header.component';
import { ReportsComponent } from './modules/tabs/reports/reports.component';

@Component({
    standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'healthcare-2';
}
