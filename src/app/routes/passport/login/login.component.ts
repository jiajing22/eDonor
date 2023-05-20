import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import {catchError, throwError} from 'rxjs';
import {DonorService} from "../../../shared/services/donor.service";
import {StaffService} from "../../../shared/services/staff.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AdminService} from "../../../shared/services/admin.service";
import * as CryptoJS from "crypto-js";

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
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private staffService: StaffService,
    private adminService: AdminService,
    private message: NzMessageService
  ) {
    this.form = fb.nonNullable.group({
      userName: [null, [Validators.required, Validators.pattern(/^[^\p{P}]*$/u)]],
      password: [null, [Validators.required]],
    });
  }

  // #region fields

  // form = this.fb.nonNullable.group({
  //   userName: ['', Validators.required],
  //   password: ['', Validators.required],
  //   // mobile: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
  //   // captcha: ['', [Validators.required]],
  //   remember: [true]
  // });

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
    return (input.substring(0, 1).toUpperCase() === 'A')
      && (input.length === 6)
      && (regex.test(input.substring(1,6)));
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

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  // getCaptcha(): void {
  //   const mobile = this.form.controls.mobile;
  //   if (mobile.invalid) {
  //     mobile.markAsDirty({ onlySelf: true });
  //     mobile.updateValueAndValidity({ onlySelf: true });
  //     return;
  //   }
  //   this.count = 59;
  //   this.interval$ = setInterval(() => {
  //     this.count -= 1;
  //     if (this.count <= 0) {
  //       clearInterval(this.interval$);
  //     }
  //   }, 1000);
  // }

  // #endregion

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
    // this.tokenService.set({
    //   token: '123456789',
    //   id: 10000,
    //   time: +new Date(),
    // });

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
          var encrypted = CryptoJS.AES.encrypt(res.userId, this.sKey).toString();
          sessionStorage.setItem('userId', encrypted);
          this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigate(['../donorMenu']);
          });
        })
    } else if (this.isStaff(this.input)) {
      let postData = {
        userId: this.userName.value.toUpperCase(),
        password: this.password.value
      };
      this.staffService.validateStaffLogin(postData)
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
          sessionStorage.setItem('userId', res.userId);
          this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigate(['../staff']);
          });
        })
    } else if(this.isAdmin(this.input)){
      let postData = {
        userId: this.userName.value.toUpperCase(),
        password: this.password.value
      };
      this.adminService.validateAdminLogin(postData)
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
          sessionStorage.setItem('userId', res.userId);
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

    // this.loading = true;
    // this.cdr.detectChanges();
    // this.http
    //   .post(
    //     '/login/account',
    //     {
    //       type: this.type,
    //       userName: this.form.value.userName,
    //       password: this.form.value.password
    //     },
    //     null,
    //     {
    //       context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    //     }
    //   )
    //   .pipe(
    //     finalize(() => {
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //     })
    //   )
    //   .subscribe(res => {
    //     if (res.msg !== 'ok') {
    //       this.error = res.msg;
    //       this.cdr.detectChanges();
    //       return;
    //     }
    //     // 清空路由复用信息
    //     this.reuseTabService.clear();
    //     // 设置用户Token信息
    //     // TODO: Mock expired value
    //     res.user.expired = +new Date() + 1000 * 60 * 5;
    //     this.  tokenService.set(res.user);
    //     // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
    //     this.startupSrv.load().subscribe(() => {
    //       let url = this.tokenService.referrer!.url || '/';
    //       if (url.includes('/passport')) {
    //         url = '/';
    //       }
    //       this.router.navigateByUrl(url);
    //     });
    //   });
  }

  // #region social

  open(type: string, openType: SocialOpenType = 'href'): void {
    let url = ``;
    let callback = ``;
    if (environment.production) {
      callback = `https://ng-alain.github.io/ng-alain/#/passport/callback/${type}`;
    } else {
      callback = `http://localhost:4200/#/passport/callback/${type}`;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window'
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href'
      });
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
