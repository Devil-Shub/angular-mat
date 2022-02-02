import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashService } from '../../services/splash.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private splashService: SplashService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('user-token');
    this.splashService.flashMessage("User logged out successfully!")
    this.router.navigate(['/auth/login']);
  }

}
