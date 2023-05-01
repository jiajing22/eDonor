import {Component, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";

@Component({
  selector: 'donor-sidebar',
  templateUrl: './donor.sider.component.html',
  // styleUrls: [''],
})
export class DonorSiderComponent implements OnInit{

  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute
  ) {
  }

  loggedIn: boolean = false;

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('userType') != null;
  }

  logout(): void{
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('status');
    this.router.navigateByUrl('/dashboard/landing');
  }
}
