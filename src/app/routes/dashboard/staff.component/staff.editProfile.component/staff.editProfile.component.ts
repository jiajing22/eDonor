import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';

import { StaffService } from '../../../../shared/services/staff.service';
import {MatchControl} from "@delon/util/form";
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Component({
  selector: 'app-staff-edit-acc-component',
  templateUrl: './staff.editProfile.component.html',
  styles: [`
    .login-form{
      width: 600px;
      margin: auto;
    }
  `]
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
  // example: string =" ";
  decryptedId: string = "";
  isEdit = false;
  loading = false;
  changePw = false;
  userPw:string="";
  error = '';
  passwordVisible = false;
  newPasswordVisible = false;

  passwordForm = this.fb.nonNullable.group({
      oldPass: ['',[Validators.required]],
      newPass: ['',[Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/)]],
      confirmPass: ['',[Validators.required]],
    },
    {validators: MatchControl('newPass', 'confirmPass')}
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

  submitPassForm(): void{
    this.error = '';
    Object.keys(this.passwordForm.controls).forEach(key => {
      const control = (this.passwordForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.passwordForm.invalid) {
      return;
    }

    this.loading =  true;
    let hashedOld =  CryptoJS.SHA256(this.oldPw.value.toString()).toString();
    if( hashedOld === this.userPw ){

      if ( this.newPw.value === this.confirmPw.value ){
        let postData={
          donorId: this.decryptedId,
          password: this.newPw.value
        }
        // this.donorService.changePw(postData)
        //   .pipe(
        //     catchError(err => {
        //       this.message.error(err.error);
        //       this.loading=false;
        //       return throwError(err);
        //     })
        //   )
        //   .subscribe((res: any) => {
        //     this.message.success("Successfully Updated");
        //     setTimeout(() => {
        //       this.loading =  false;
        //     }, 1500);
        //     setTimeout(() => {
        //       window.location.reload();
        //     }, 2000);
        //   });
      }
    }else{
      setTimeout(() => {
        this.message.error("Incorrect Old Password. Please try again.");
        this.passwordForm.get('oldPass')!.setValue('');
        this.loading =  false;
      }, 1000);

    }
  }
}
