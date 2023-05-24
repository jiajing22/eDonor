import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-admin-sider-component',
  templateUrl: './admin.sider.html',
  styleUrls: ['./admin.sider.css']
})
export class AdminSider {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  redirect(destination: string){
    switch (destination) {
      case 'home':
        this.router.navigate(['/admin/main/main-page']);
        break;
      case 'donor':
        this.router.navigate(['/admin/main/manage-donor']);
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
