import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService, SocialService } from '@delon/auth';
import {catchError, throwError} from 'rxjs';
import {DonorService} from "../../../shared/services/donor.service";
import {StaffService} from "../../../shared/services/staff.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AdminService} from "../../../shared/services/admin.service";
import * as CryptoJS from "crypto-js";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private staffService: StaffService,
    private adminService: AdminService,
    private message: NzMessageService,
    private authService: AuthService,
  ) {
    this.form = fb.nonNullable.group({
      userName: [null, [Validators.required, Validators.pattern(/^[^\p{P}]*$/u)]],
      password: [null, [Validators.required]],
    });
  }

  get userName(): AbstractControl {
    return this.form.get('userName')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  isIC(input: string): boolean {
    const regex = /^\d{12}$/;
    return regex.test(input);
  }

  isStaff(input: string): boolean{
    const regex = /^\d{5}$/;
    return (input.substring(0, 2).toUpperCase() === 'ST')
      && (input.length === 7)
      && (regex.test(input.substring(2,7)));
  }

  isAdmin(input: string): boolean{
    const regex = /^\d{5}$/;
    return (input.substring(0, 2).toUpperCase() === 'AD')
      && (input.length === 7)
      && (regex.test(input.substring(2,7)));
  }

  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  input ='';
  sKey= "x^XICt8[Lp'Gm<8";

  // #region get captcha

  count = 0;
  interval$: any;

  auth(){
    let authToken = this.authService.generateAuthToken();
    this.authService.setAuthTokenInSessionStorage(authToken);
  }

  submit(): void {
    this.input = this.userName.value;
    this.error = '';
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }

    this.loading = true;
    this.cdr.detectChanges();

    if (this.isIC(this.input)) {
      let postData = {
        userId: this.userName.value,
        password: this.password.value
      };

      this.donorService.validateDonorLogin(postData)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            this.loading = false;
            setTimeout(() => {
              this.cdr.detectChanges();
            }, 1000);

            this.form.get('password')!.setValue(null);
            return throwError(err);
          })
        )
        .subscribe((res:any) => {
          if (res === null){
            this.message.info('Incorrect Password or Username!');
            this.loading = false;
            this.cdr.detectChanges();
            return;
          }
          if (!res.isVerified){
            this.message.info('Please activate your account via email');
            this.loading = false;
            this.cdr.detectChanges();
            return;
          }  else{
            var encrypted = CryptoJS.AES.encrypt(res.userId, this.sKey).toString();
            sessionStorage.setItem('userId', encrypted);
            sessionStorage.setItem('userType', 'Donor');
            this.auth();
            this.router.navigate(['../donorMenu']);
          }
        })
    }

    else if (this.isStaff(this.input)) {
      let postData = {
        userId: this.userName.value.toUpperCase(),
        password: this.password.value
      };
      this.staffService.validateStaffLogin(postData)
        .subscribe((res:any) => {
          if(res == null ){
            this.message.error("Incorrect Username or Password!");
            this.loading = false;
            setTimeout(() => {
              this.cdr.detectChanges();
            }, 1000);
            this.form.get('password')!.setValue(null);
            return;
          } else {
            var encrypted = CryptoJS.AES.encrypt(res.userId, this.sKey).toString();
            sessionStorage.setItem('userId', encrypted);
            sessionStorage.setItem('userType', 'Staff');
            this.auth();
            this.startupSrv.load().subscribe(() => {
              let url = this.tokenService.referrer!.url || '/';
              if (url.includes('/passport')) {
                url = '/';
              }
              this.router.navigate(['../staff']);
            });
          }
        })
    }

    else if(this.isAdmin(this.input)){
      let postData = {
        userId: this.userName.value.toUpperCase(),
        password: this.password.value
      };
      this.adminService.validateAdminLogin(postData)
        .subscribe((res:any) => {
          if( res == null){
            setTimeout(() => {
              this.message.error("Incorrect Username or Password!");
              this.loading = false;
              this.cdr.detectChanges();
              this.form.get('password')!.setValue(null);
              return;
            }, 1000);
          }
          var encrypted = CryptoJS.AES.encrypt(res.userId, this.sKey).toString();
          sessionStorage.setItem('userId', encrypted);
          sessionStorage.setItem('userType', 'Admin');
          this.auth();
          this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigate(['../admin']);
          });
        })
    } else {
      this.loading = false;
      this.cdr.detectChanges();
      this.message.error("Invalid login, please make sure enter correct username and password");
      this.form.get('password')!.setValue(null);
    }
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
