import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import * as CryptoJS from "crypto-js";
import {catchError, throwError} from "rxjs";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {MatchControl} from "@delon/util/form";

@Component({
  selector: 'app-donor-edit-profile-component',
  templateUrl: './donor.edit-profile.html',
  styleUrls: ['./donor.edit-profile.css'],
})
export class DonorEditProfile implements OnInit {
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
  isEdit = false;
  loading = false;
  changePw = false;
  userPw:string="";
  toggleLoading = false;
  error = '';
  passwordVisible = false;
  newPasswordVisible = false;

  editForm = this.fb.nonNullable.group({
      email: [''],
      address: [''],
      phone: [''],
    }
  );

  passwordForm = this.fb.nonNullable.group({
      oldPass: ['',[Validators.required]],
      newPass: ['',[Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/)]],
      confirmPass: ['',[Validators.required]],
    },
    {validators: MatchControl('newPass', 'confirmPass')}
  );

  get email(): AbstractControl {
    return this.editForm.get('email')!;
  }

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
        this.editForm.patchValue(this.donor);
        this.userPw = this.donor.password;
        // this.passwordForm.get('oldPass')?.setValue(this.donor.password);
      });

    this.editForm.get('email')?.disable();
    this.editForm.get('address')?.disable();
    this.editForm.get('phone')?.disable();
  }

  submitForm(): void {
    this.loading =  true;
    let postData = {
      donorId: this.decryptedId,
      email: this.editForm.get('email')?.value,
      phone: this.editForm.get('phone')?.value,
      address: this.editForm.get('address')?.value
    };
    console.log(postData)

    this.donorService.updateInfo(postData)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.message.success("Successfully Updated");
        this.isEdit = false;
        setTimeout(() => {
          this.loading =  false;
        }, 1000);
        this.editForm.get('email')?.disable();
        this.editForm.get('address')?.disable();
        this.editForm.get('phone')?.disable();
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
        this.donorService.changePw(postData)
          .pipe(
            catchError(err => {
              this.message.error(err.error);
              this.loading=false;
              return throwError(err);
            })
          )
          .subscribe((res: any) => {
            this.message.success("Successfully Updated");
            setTimeout(() => {
              this.loading =  false;
            }, 1500);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      }
    }else{
      setTimeout(() => {
        this.message.error("Incorrect Old Password. Please try again.");
        this.loading =  false;
      }, 1000);
    }
}

  enableEdit(): void {
    this.editForm.get('email')?.enable();
    this.editForm.get('address')?.enable();
    this.editForm.get('phone')?.enable();
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.editForm.get('email')?.disable();
    this.editForm.get('address')?.disable();
    this.editForm.get('phone')?.disable();
    this.editForm.reset();
    this.editForm.get('email')?.setValue(this.donor.email);
    this.editForm.get('address')?.setValue(this.donor.address);
    this.editForm.get('phone')?.setValue(this.donor.phone);
    this.isEdit = false;
  }

  toggleForm():void {
    this.changePw = true;
  }

  toggleUpdateForm():void {
    this.changePw = false;
    this.passwordForm.reset();
  }
}
