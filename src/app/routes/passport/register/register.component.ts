import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
export class UserRegisterComponent implements OnInit {
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
      ic: ['',Validators.required],
      fullName: ['',Validators.required],
      gender: ['',Validators.required],
      bloodType: ['',Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password:
        ['',
          [Validators.required,
            Validators.minLength(6),
            UserRegisterComponent.checkPassword.bind(this)]
        ],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required,Validators.pattern(/^[0-9]{9,10}$/)]],
      address: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(/^[^$%&*]+$/)]]
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
    this.loading=true;

    let postData = {
      userId: this.form.value.ic,
      password: this.form.value.password,
      fullName: this.form.value.fullName?.toUpperCase(),
      gender: this.form.value.gender,
      bloodType: this.form.value.bloodType,
      phone: this.form.value.mobile,
      email: this.form.value.mail,
      address: this.form.value.address,
    };

    console.log(postData);

    this.donorService.register(postData)
      .pipe(
        catchError(err => {
        this.message.error(err.error);
        return throwError(err);
      })
      )
      .subscribe((res:any) => {
        this.loading=false;
        this.cdr.detectChanges();
        console.log(res);
        if (res === 'Existing document ID'){
          this.message.error("Registration Failed!");
        } else if (res === 'registeredIc'){
          this.message.error('The IC Number is already been registered.');
        } else if (res === 'emailUsed'){
          this.message.error('The email is already been used.');
        } else{
          setTimeout(() => {
            this.message.success("Registration Successful!");
            this.router.navigate(['/passport/register-result']);
          }, 3000);
        }
      });
  }

  ngOnInit(): void {
    this.form.get('fullName')?.valueChanges.subscribe((value: string) => {
      if (value) {
        this.form.get('fullName')?.setValue(value.toUpperCase(), {emitEvent: false});
      }
    });
  }
}
