import {Component, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {environment} from '@env/environment';
import {map, Observable} from "rxjs";
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
    this.loggedIn = localStorage.getItem('userType') != null;
  }

  logout(): void{
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('status');
    // TODO: redirect page
    this.router.navigateByUrl(this.tokenService.login_url!);
    // this.router.navigate(['../landing'],{relativeTo:this.route});
  }
}
