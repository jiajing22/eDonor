import {Component, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";

@Component({
  selector: 'donor-sidebar',
  templateUrl: './donor.sider.component.html',
  styleUrls: ['./donor.sider.component.css'],
})
export class DonorSiderComponent{

  constructor(
    private settings: SettingsService,
    private router: Router,
  ) {
  }

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
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
        this.router.navigate(['/donorMenu/main/appointment']);
        break;
      case 'form':
        this.router.navigate(['/donorMenu/main/regform']);
        break;
      default:
        break;
    }
  }
}
