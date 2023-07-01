import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatchControl } from '@delon/util/form';
import * as CryptoJS from 'crypto-js';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AdminService } from '../../../../shared/services/admin.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-edit-profile-component',
  templateUrl: './admin.edit-profile.component.html',
  styleUrls: ['./admin.edit-profile.component.css']
})
export class AdminEditProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  sKey = "x^XICt8[Lp'Gm<8";
  admin: any;
  // example: string =" ";
  decryptedId: string = '';
  isEdit = false;
  loading = false;
  userPw: string = '';
  error = '';
  passwordVisible = false;
  newPasswordVisible = false;

  passwordForm = this.fb.nonNullable.group(
    {
      oldPass: ['', [Validators.required]],
      newPass: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/)]],
      confirmPass: ['', [Validators.required]]
    },
    { validators: MatchControl('newPass', 'confirmPass') }
  );

  get oldPw(): AbstractControl {
    return this.passwordForm.get('oldPass')!;
  }

  get newPw(): AbstractControl {
    return this.passwordForm.get('newPass')!;
  }

  get confirmPw(): AbstractControl {
    return this.passwordForm.get('confirmPass')!;
  }

  ngOnInit() {
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Admin') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
    }

    let sessionItem = sessionStorage.getItem('userId');

    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    }

    let post = {
      documentId: this.decryptedId
    };

    this.adminService.getAdminById(post).subscribe((res: any) => {
      this.admin = res;
      this.userPw = this.admin.password;
    });
  }

  submitPassForm(): void {
    this.error = '';
    Object.keys(this.passwordForm.controls).forEach(key => {
      const control = (this.passwordForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;
    let hashedOld = CryptoJS.SHA256(this.oldPw.value.toString()).toString();
    if (hashedOld === this.userPw) {
      if (this.newPw.value === this.confirmPw.value) {
        let postData = {
          userId: this.decryptedId,
          password: this.newPw.value
        };
        this.adminService.changePassword(postData).subscribe((res: any) => {
          if (res != null) {
            this.message.success('Password Changed Successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            this.message.error('Password Changed Failed!');
          }
        });
      }
    } else {
      setTimeout(() => {
        this.message.error('Incorrect Old Password. Please try again.');
        this.passwordForm.get('oldPass')!.setValue('');
        this.loading = false;
      }, 1000);
    }
  }
}
