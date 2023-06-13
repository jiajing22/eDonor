import {Component, HostListener} from '@angular/core';
import {SettingsService} from '@delon/theme';
import { Router} from "@angular/router";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'staff-sidebar',
  templateUrl: './staff.sider.component.html',
  styleUrls: ['./staff.sider.component.css'],
})
export class StaffSiderComponent {
  isSmallScreen: boolean = false;
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
      case 'app':
        this.router.navigate(['/staff/main/manageApp']);
        break;
      case 'form':
        this.router.navigate(['/staff/main/manageForm']);
        break;
      case 'record':
        this.router.navigate(['/staff/main/manageRecord']);
        break;
      default:
        break;
    }
  }
}
