import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {catchError, throwError} from 'rxjs';
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

  confirmVisible = false;
  passwordVisible = false;
  password?: string;

  form = this.fb.nonNullable.group(
    {
      ic: ['',[Validators.required, Validators.pattern(/^\d{12}$/)]],
      fullName: ['',Validators.required],
      gender: [null,Validators.required],
      bloodType: ['',Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password:
        ['',
          [Validators.required,
            Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/)]
        ],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
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

  count = 0;

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
