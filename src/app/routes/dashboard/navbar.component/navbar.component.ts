import {Component, Inject, Input, OnInit} from '@angular/core';
import {SettingsService, User} from '@delon/theme';
import {ActivatedRoute, Router} from "@angular/router";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import * as CryptoJS from "crypto-js";

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
  decryptedId: string = "";
  sKey = "x^XICt8[Lp'Gm<8";

  ngOnInit(): void {
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    } else {
      console.log('Encrypted message not found.');
    }
    this.loggedIn = sessionStorage.getItem('userId') != null;
    console.log(this.decryptedId);
  }

  logout(): void{
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('status');
    this.router.navigateByUrl('/dashboard/landing');
  }

  isDonor(input: string): boolean {
    const regex = /^\d{5}$/;
    return (input.substring(0, 2).toUpperCase() === 'DN')
      && (input.length === 7)
      && (regex.test(input.substring(2,7)));
  }

  isStaff(input: string): boolean{
    const regex = /^\d{5}$/;
    return (input.substring(0, 2).toUpperCase() === 'ST')
      && (input.length === 7)
      && (regex.test(input.substring(2,7)));
  }

  isAdmin(input: string): boolean{
    const regex = /^\d{5}$/;
    return (input.substring(0, 2).toUpperCase() === 'AD')
      && (input.length === 7)
      && (regex.test(input.substring(2,7)));
  }

  dashboard(){
    if(this.isAdmin(this.decryptedId)){
      this.router.navigate(['/admin/main/main-page']);
    } else if (this.isStaff(this.decryptedId)){
      this.router.navigate(['/staff/main/main-page']);
    } else if (this.isDonor(this.decryptedId)){
      this.router.navigate(['/donorMenu/main/main-page']);
    }
  }

  navigate(place:string){
    switch (place){
      case 'home':
        this.router.navigate(['/dashboard/landing']);
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
