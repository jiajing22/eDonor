import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import * as CryptoJS from "crypto-js";
import {catchError, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {StaffService} from "../../../../shared/services/staff.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-staff-add-record-component',
  templateUrl: './staff.manageForm.component.html',
  styleUrls: ['./staff.manageForm.component.css']
})
export class StaffManageFormComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private staffService: StaffService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  loading= false;
  error: string = "";
  decryptedId: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  hash: string = "";
  passwordVisible = false;

  form = this.fb.nonNullable.group({
      staffId: ['',[Validators.required]],
      password: ['',[Validators.required]],
    }
  );

  get id(): AbstractControl {
    return this.form.get('staffId')!;
  }

  get pw(): AbstractControl {
    return this.form.get('password')!;
  }

  submit():void{
    this.error = '';
    Object.keys(this.form.controls).forEach(key => {
      const control = (this.form.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }
    this.loading =  true;
    let sessionItem = sessionStorage.getItem('userId');
    this.hash = CryptoJS.SHA256(this.pw.value).toString();
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    } else {
      console.log('Encrypted message not found.');
    }

    if (this.decryptedId === this.id.value ){
      this.staffService.getStaffInfo(this.decryptedId)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            return throwError(err);
          })
        )
        .subscribe((res: any) => {

          if (this.hash === res.password){
            this.router.navigate(['/staff/main/recordForm']);
            setTimeout(() => {
              this.cdr.detectChanges();
            }, 1000);

          } else {
            this.message.error('Wrong Password!');
            this.loading=false;

          }
        });

    } else {
      this.message.error('Wrong Staff ID!');
      this.loading=false;
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 1000);

    }
  }

}
