import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {NzMessageService} from "ng-zorro-antd/message";
import {AdminService} from "../../../../shared/services/admin.service";
import {Router} from "@angular/router";

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
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  sKey = "x^XICt8[Lp'Gm<8";
  admin: any;
  decryptedId: string = "";

  ngOnInit(): void {
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Admin') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }

    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    } else {
      this.message.error("You are not logged In!");
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
