import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';

import { StaffService } from '../../../../shared/services/staff.service';

@Component({
  selector: 'app-staff-edit-acc-component',
  templateUrl: './staff.editProfile.component.html'
  // styleUrls: ['./staff.viewAcc.component.css']
})
export class StaffEditProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private staffService: StaffService,
    private message: NzMessageService
  ) {}

  sKey = "x^XICt8[Lp'Gm<8";
  staff: any;
  decryptedId: string = '';

  ngOnInit(): void {
    let sessionItem = sessionStorage.getItem('userId');

    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    } else {
      console.log('Encrypted message not found.');
    }

    this.staffService
      .getStaffInfo(this.decryptedId)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.staff = res;
      });
  }
}
