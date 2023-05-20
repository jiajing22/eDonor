import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {DonorService} from "../../../../shared/services/donor.service";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Donor} from "../../../../shared/model/donor.model";

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
    private message: NzMessageService
  ) {
  }

  sKey = "x^XICt8[Lp'Gm<8";
  donor: any;
  // example: string =" ";
  decryptedId: string = "";

  ngOnInit(): void {
    let sessionItem = sessionStorage.getItem('userId');

    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    } else {
      console.log('Encrypted message not found.');
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

    //TODO: Limit the address character to 100 character and create another variable for address if needed ----
    // if the extra variable contain value, put below the {{ donor.address }}
  }
}
