import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {catchError, finalize, throwError} from 'rxjs';
import {DonorService} from "../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRegisterComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private message: NzMessageService
  ) {}

  // #region fields

  passwordVisible = false;
  password?: string;

  form = this.fb.nonNullable.group(
    {
      ic: ['001222011130',Validators.required],
      fullName: ['John Doe',Validators.required],
      gender: ['male',Validators.required],
      bloodType: ['A',Validators.required],
      mail: ['johndoe@gmail.com', [Validators.required, Validators.email]],
      password:
        ['qweasd123',
          [Validators.required,
            Validators.minLength(6),
            UserRegisterComponent.checkPassword.bind(this)]
        ],
      confirm: ['qweasd123', [Validators.required, Validators.minLength(6)]],
      mobile: ['127356682', [Validators.required,Validators.pattern(/^[0-9]{9,10}$/)]],
      address: ['test', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[^$%&*]+$/)]]
      // mobile: ['', [Validators.required]]
      // captcha: ['', [Validators.required]]
    },
    {
      validators: MatchControl('password', 'confirm')
    }
  );
  error = '';
  type = 0;
  loading = false;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap: { [key: string]: 'success' | 'normal' | 'exception' } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception'
  };

  // #endregion

  // #region get captcha

  count = 0;
  interval$: NzSafeAny;

  static checkPassword(control: FormControl): NzSafeAny {
    if (!control) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: NzSafeAny = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }

  // getCaptcha(): void {
  //   const { mobile } = this.form.controls;
  //   if (mobile.invalid) {
  //     mobile.markAsDirty({ onlySelf: true });
  //     mobile.updateValueAndValidity({ onlySelf: true });
  //     return;
  //   }
  //   this.count = 59;
  //   this.cdr.detectChanges();
  //   this.interval$ = setInterval(() => {
  //     this.count -= 1;
  //     this.cdr.detectChanges();
  //     if (this.count <= 0) {
  //       clearInterval(this.interval$);
  //     }
  //   }, 1000);
  // }

  // #endregion

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

    console.log(this.form.value);
    let postData = {
      userId: this.form.value.ic,
      password: this.form.value.password,
      fullName: this.form.value.fullName?.toUpperCase(),
      gender: this.form.value.gender,
      bloodType: this.form.value.bloodType,
      phone: this.form.value.mobile,
      email: this.form.value.mail
    };

    console.log(postData);

    this.donorService.register(postData)
      .pipe(
        catchError(err => {
        this.message.error(err.error);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        return throwError(err);
      })
      )
      .subscribe((res:any) => {
        console.log(res);
        this.message.success("Registration Successful!");
      });
    // this.router.navigate(['passport', 'register-result'], { queryParams: { email: this.form.value.mail } });

    // const data = this.form.value;
    // this.loading = true;
    // this.cdr.detectChanges();
    // this.http
    //   .post('/register', data, null, {
    //     context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    //   })
    //   .pipe(
    //     finalize(() => {
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //     })
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['passport', 'register-result'], { queryParams: { email: data.mail } });
    //   });
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
