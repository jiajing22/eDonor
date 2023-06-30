import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';

import { StaffService } from '../../../../shared/services/staff.service';

@Component({
  selector: 'app-staff-add-record-component',
  templateUrl: './staff.addRecord.component.html',
  styleUrls: ['./staff.addRecord.component.css']
})
export class StaffAddRecordComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private staffService: StaffService,
    private message: NzMessageService,
    private router: Router
  ) {}

  loading = false;
  error: string = '';
  decryptedId: string = '';
  sKey = "x^XICt8[Lp'Gm<8";
  hash: string = '';
  passwordVisible = false;
  routeVisible = false;

  form = this.fb.nonNullable.group({
    staffId: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  get id(): AbstractControl {
    return this.form.get('staffId')!;
  }

  get pw(): AbstractControl {
    return this.form.get('password')!;
  }

  submit(): void {
    this.error = '';
    Object.keys(this.form.controls).forEach(key => {
      const control = (this.form.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let sessionItem = sessionStorage.getItem('userId');
    this.hash = CryptoJS.SHA256(this.pw.value).toString();
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    }
    if (this.decryptedId === this.id.value) {
      this.staffService.getStaffInfo(this.decryptedId).subscribe((res: any) => {
        if (this.hash === res.password) {
          this.routeVisible = true;
        } else {
          this.message.error('Wrong Password!');
          this.loading = false;
        }
      });
    } else {
      this.message.error('Wrong Staff ID!');
      this.loading = false;
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  close() {
    this.routeVisible = false;
    this.loading = false;
  }

  navigate(route: string) {
    if (route === 'add') {
      // this.router.navigate(['/staff/main/recordForm']);
      window.open('/#/staff/main/recordForm', '_blank');
      this.close();
      this.form.get('password')!.setValue('');
    } else if (route === 'edit') {
      // this.router.navigate(['/staff/main/manageRecord']);
      window.open('/#/staff/main/manageRecord', '_blank');
      this.close();
    }
  }
}
