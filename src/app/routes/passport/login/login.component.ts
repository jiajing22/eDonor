import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import {catchError, finalize, throwError} from 'rxjs';
import {DonorService} from "../../../shared/services/donor.service";
import {StaffService} from "../../../shared/services/staff.service";
import {NzMessageService} from "ng-zorro-antd/message";

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
    private message: NzMessageService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
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

  form: FormGroup;
  error = '';
  type = 0;
  userType = 0;
  loading = false;

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

    if (this.userType === 0) {
      let postData = {
        userId: this.userName.value,
        password: this.password.value
      };

      console.log(postData);
      this.donorService.validateDonorLogin(postData)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            return throwError(err);
          })
        )
        .subscribe((res:any) => {
          sessionStorage.setItem('userId', res.userId);
          sessionStorage.setItem('userType', this.userType.toString());
          this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            // this.router.navigateByUrl(url);
            this.router.navigate(['../donorMenu']);
          });
        })
    } else if (this.userType === 1) {
      let postData = {
        userId: this.userName.value,
        password: this.password.value
      };
      this.staffService.validateStaffLogin(postData)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            return throwError(err);
          })
        )
        .subscribe((res:any) => {
          sessionStorage.setItem('userId', res.userId);
          sessionStorage.setItem('userType', this.userType.toString());
          this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigate(['../staff']);
          });
        })
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
