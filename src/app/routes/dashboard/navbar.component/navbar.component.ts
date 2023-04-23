import {Component, Input, Output, TemplateRef} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {environment} from '@env/environment';
import {map, Observable} from "rxjs";

@Component({
  selector: 'navbar-layout-basic',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor() {
  }
}
