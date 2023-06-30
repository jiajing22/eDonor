import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-sider-component',
  templateUrl: './admin.sider.component.html',
  styleUrls: ['./admin.sider.component.css']
})
export class AdminSiderComponent {
  constructor(private fb: FormBuilder, private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  redirect(destination: string) {
    switch (destination) {
      case 'home':
        this.router.navigate(['/admin/main/main-page']);
        break;
      case 'profile':
        this.router.navigate(['/admin/main/profile']);
        break;
      case 'edit':
        this.router.navigate(['/admin/main/edit-profile']);
        break;
      case 'admin':
        this.router.navigate(['/admin/main/manage-admin']);
        break;
      case 'donor':
        this.router.navigate(['/admin/main/manage-donor']);
        break;
      case 'staff':
        this.router.navigate(['/admin/main/manage-staff']);
        break;
      case 'record':
        this.router.navigate(['/admin/main/manage-record']);
        break;
      case 'bloodCentre':
        this.router.navigate(['/admin/main/manage-bdcentre']);
        break;
      default:
        break;
    }
  }
}
