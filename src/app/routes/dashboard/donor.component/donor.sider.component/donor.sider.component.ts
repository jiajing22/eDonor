import {Component, HostListener, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'donor-sidebar',
  templateUrl: './donor.sider.component.html',
  styleUrls: ['./donor.sider.component.css'],
})
export class DonorSiderComponent{
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
        this.router.navigate(['/donorMenu/main/main-page']);
        break;
      case 'profile':
        this.router.navigate(['/donorMenu/main/donor-account']);
        break;
      case 'edit':
        this.router.navigate(['/donorMenu/main/donor-edit']);
        break;
      case 'history':
        this.router.navigate(['/donorMenu/main/donate-history']);
        break;
      case 'appointment':
        this.router.navigate(['/donorMenu/main/appointment-history']);
        break;
      case 'form':
        this.router.navigate(['/donorMenu/main/form']);
        break;
      default:
        break;
    }
  }
}
