import {Component, Inject, Input, OnInit} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";

@Component({
  selector: 'navbar-layout-basic',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{

  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute
  ) {
  }

  loggedIn: boolean = false;

  ngOnInit(): void {
    this.loggedIn = sessionStorage.getItem('userId') != null;
  }

  logout(): void{
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('status');
    this.router.navigateByUrl('/dashboard/landing');
  }
}
