import {Component, HostListener, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'staff-sidebar',
  templateUrl: './staff.sider.component.html',
  styleUrls: ['./staff.sider.component.css'],
})
export class StaffSiderComponent {
  isSmallScreen: boolean = false;
  isLargeScreen: boolean = false;
  constructor(
    private settings: SettingsService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  isCollapsed = true;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    this.isCollapsed = screenWidth < 768; // Adjust the threshold as needed
    this.isSmallScreen = screenWidth < 768; // Adjust the threshold as needed
  }

  redirect(destination: string){
    switch (destination) {
      case 'home':
        this.router.navigate(['/staff/main/main-page']);
        break;
      case 'profile':
        this.router.navigate(['/staff/main/staffAcc']);
        break;
      case 'edit':
        this.router.navigate(['/donorMenu/main/donor-edit']);
        break;
      case 'search':
        this.router.navigate(['/staff/main/staffSearch']);
        break;
      case 'addRecord':
        this.router.navigate(['/staff/main/staffAdd']);
        break;
      case 'staffPost':
        this.router.navigate(['/staff/main/staffPost']);
        break;
      case 'manageApp':
        this.router.navigate(['/staff/main/staffPost']);
        break;
      case 'manageForm':
        this.router.navigate(['/staff/main/staffPost']);
        break;
      default:
        break;
    }
  }
}
