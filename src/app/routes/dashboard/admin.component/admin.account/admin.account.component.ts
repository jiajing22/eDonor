import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {DonorService} from "../../../../shared/services/donor.service";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {AdminService} from "../../../../shared/services/admin.service";

@Component({
  selector: 'app-admin-account-component',
  templateUrl: './admin.account.component.html',
  styleUrls: ['./admin.account.component.css'],
})
export class AdminAccountComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private message: NzMessageService
  ) {
  }

  sKey = "x^XICt8[Lp'Gm<8";
  admin: any;
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
    let post = {
      documentId : this.decryptedId
    }

    this.adminService.getAdminById(post)
      .subscribe((res: any) => {
        this.admin = res;
      });

    //TODO: Limit the address character to 100 character and create another variable for address if needed ----
    // if the extra variable contain value, put below the {{ donor.address }}
  }
}
