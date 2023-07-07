import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'navbar-layout-basic',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private settings: SettingsService, private router: Router, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {}

  loggedIn: boolean = false;
  decryptedId: string = '';
  sKey = "x^XICt8[Lp'Gm<8";
  role: string | null = '';

  ngOnInit(): void {
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    }
    this.loggedIn = sessionStorage.getItem('userId') != null;
    if (this.loggedIn) {
      this.role = sessionStorage.getItem('userType');
    }
  }

  logout(): void {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/dashboard/landing').then(() => {
      location.reload();
    });
  }

  isDonor(input: string): boolean {
    const regex = /^\d{5}$/;
    return input.substring(0, 2).toUpperCase() === 'DN' && input.length === 7 && regex.test(input.substring(2, 7));
  }

  isStaff(input: string): boolean {
    const regex = /^\d{5}$/;
    return input.substring(0, 2).toUpperCase() === 'ST' && input.length === 7 && regex.test(input.substring(2, 7));
  }

  isAdmin(input: string): boolean {
    const regex = /^\d{5}$/;
    return input.substring(0, 2).toUpperCase() === 'AD' && input.length === 7 && regex.test(input.substring(2, 7));
  }

  dashboard() {
    if (this.isAdmin(this.decryptedId)) {
      this.router.navigate(['/admin/main/main-page']);
    } else if (this.isStaff(this.decryptedId)) {
      this.router.navigate(['/staff/main/main-page']);
    } else if (this.isDonor(this.decryptedId)) {
      this.router.navigate(['/donorMenu/main/main-page']);
    }
  }

  navigate(place: string) {
    switch (place) {
      case 'home':
        this.router.navigate(['/dashboard/landing']);
        break;
      case 'campaign':
        this.router.navigate(['/dashboard/campaign']);
        break;
      case 'record':
        this.router.navigate(['/admin/main/manage-record']);
        break;
      case 'bloodCentre':
        this.router.navigate(['/admin/main/manage-bdcentre']);
        break;
      case 'login':
        this.router.navigate(['/dashboard/login']);
        break;
      case 'eligibility':
        this.router.navigate(['/dashboard/eligibility']);
        break;
      case 'privilege':
        this.router.navigate(['/dashboard/privilege']);
        break;
      case 'benefits':
        this.router.navigate(['/dashboard/benefits']);
        break;
      case 'list':
        this.router.navigate(['/dashboard/list']);
        break;
      default:
        break;
    }
  }
}
