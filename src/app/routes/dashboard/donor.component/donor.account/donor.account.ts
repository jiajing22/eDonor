import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {DonorService} from "../../../../shared/services/donor.service";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-donor-account-component',
  templateUrl: './donor.account.html',
  styleUrls: ['./donor.account.css'],
})
export class DonorAccount implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  sKey = "x^XICt8[Lp'Gm<8";
  donor: any;
  decryptedId: string = "";

  ngOnInit(): void {
    this.authenticate();
    let sessionItem = sessionStorage.getItem('userId');

    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    } else {
      this.message.error('Not authenticated!');
    }

    this.donorService.getDonorInfo(this.decryptedId)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.donor = res;
      });
  }

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Donor') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }
  }
}
