import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {catchError, finalize, of, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {HistoryService} from "../../../../shared/services/history.service";
import {History} from "../../../../shared/model/history.model";
import { messageConstant } from "../../../../shared/utils/constant";
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Component({
  selector: 'app-donor-registration-component',
  templateUrl: './donor.registration-form.html',
  styleUrls: ['./donor.registration-form.css']
})
export class DonorRegistrationForm implements OnInit {
  questionnaires!: FormGroup;
  formControlNames = [
    'q1', 'q2', 'q3', 'q3a', 'q3a1', 'q4a', 'q4a1','q4b', 'q4c', 'q4d', 'q4d1', 'q6', 'q6a1', 'q7a', 'q7b', 'q7c',
    'q8', 'q8a1', 'q9', 'q10', 'q11', 'q12a', 'q12b', 'q12c', 'q12d', 'q13a', 'q13b', 'q13c','q14a', 'q14b', 'q14c', 'q14d',
    'q14e', 'q14f', 'q14g', 'q14h', 'q14i', 'q15a', 'q15b','q15c','q15d','t1','t2', 't3','t4',
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private historyService: HistoryService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }
  protected readonly messageConstant = messageConstant;
  loading = false;
  error: string = "";
  decryptedId: string = "";
  donorIc: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  hash: string = "";
  history: History[]=[];
  currentPage = 3;
  isConsent = false;

  section123 = [
    {
      number: '1.',
      text: this.messageConstant.QUESTION1,
      formControlName: 'q1'
    },
    {
      number: '2.',
      text: this.messageConstant.QUESTION2,
      formControlName: 'q2'
    },
    {
      number: '3.',
      text: this.messageConstant.QUESTION3,
      formControlName: 'q3'
    },
  ];

  section4 = [
    {
      number: 'b)',
      text: this.messageConstant.QUESTION4B,
      formControlName: 'q4b'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION4C,
      formControlName: 'q4c'
    },
    {
      number: 'd)',
      text: this.messageConstant.QUESTION4D,
      formControlName: 'q4d'
    },
  ];

  section7 = [
    {
      number: 'a)',
      text: this.messageConstant.QUESTION7A,
      formControlName: 'q7a'
    },
    {
      number: 'b)',
      text: this.messageConstant.QUESTION7B,
      formControlName: 'q7b'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION7C,
      formControlName: 'q7c'
    },
  ];

  section9 = [
    {
      number: '9.',
      text: this.messageConstant.QUESTION9,
      formControlName: 'q9'
    },
    {
      number: '10.',
      text: this.messageConstant.QUESTION10,
      formControlName: 'q10'
    },
    {
      number: '11.',
      text: this.messageConstant.QUESTION11,
      formControlName: 'q11'
    },
  ];

  section12 = [
    {
      number: 'a)',
      text: this.messageConstant.QUESTION12A,
      formControlName: 'q12a'
    },
    {
      number: 'b)',
      text: this.messageConstant.QUESTION12B,
      formControlName: 'q12b'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION12C,
      formControlName: 'q12c'
    },
    {
      number: 'd)',
      text: this.messageConstant.QUESTION12D,
      formControlName: 'q12d'
    },
  ];

  section13 = [
    {
      number: 'a)',
      text: this.messageConstant.QUESTION13A,
      formControlName: 'q13a'
    },
    {
      number: 'b)',
      text: this.messageConstant.QUESTION13B,
      formControlName: 'q13b'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION13C,
      formControlName: 'q13c'
    },
  ];

  section14 = [
    {
      number: 'a)',
      text: this.messageConstant.QUESTION14A,
      formControlName: 'q14a'
    },
    {
      number: 'b)',
      text: this.messageConstant.QUESTION14B,
      formControlName: 'q14b'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION14C,
      formControlName: 'q14c'
    },
    {
      number: 'd)',
      text: this.messageConstant.QUESTION14D,
      formControlName: 'q14d'
    },
    {
      number: 'e)',
      text: this.messageConstant.QUESTION14E,
      formControlName: 'q14e'
    },
    {
      number: 'f)',
      text: this.messageConstant.QUESTION14F,
      formControlName: 'q14f'
    },
    {
      number: 'g)',
      text: this.messageConstant.QUESTION14G,
      formControlName: 'q14g'
    },
    {
      number: 'h)',
      text: this.messageConstant.QUESTION14H,
      formControlName: 'q14h'
    },
    {
      number: 'i)',
      text: this.messageConstant.QUESTION14I,
      formControlName: 'q14i'
    },
  ];

  section15 = [
    {
      number: 'a)',
      text: this.messageConstant.QUESTION15A,
      formControlName: 'q15a'
    },
    {
      number: 'b)',
      text: this.messageConstant.QUESTION15B,
      formControlName: 'q15a'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION15C,
      formControlName: 'q15a'
    },
    {
      number: 'c)',
      text: this.messageConstant.QUESTION15D,
      formControlName: 'q15a'
    },
  ];

  terms = [
    {
      formControlName: 't1',
      text: this.messageConstant.TERM1
    },
    {
      formControlName: 't2',
      text: this.messageConstant.TERM2
    },
    {
      formControlName: 't3',
      text: this.messageConstant.TERM3
    },
    {
      formControlName: 't4',
      text: this.messageConstant.TERM4
    }
  ];

  regForm = this.fb.nonNullable.group({
    name: ['',Validators.required],
    ic: ['',Validators.required],
    dob: ['',Validators.required],
    age: [null,Validators.required],
    ethnic: [null,Validators.required],
    maritial: [null,Validators.required],
    occupation: [null,Validators.required],
    homeTel: [null],
    hpTel: [null,Validators.required],
    currentAd: [null,Validators.required],
    state: [null,Validators.required],
    postcode: [null,Validators.required],
  })

  setupFieldDependencies() {
    const dependencies: { [key: string]: string } = {
      q4a: 'q4a1',
      q3a: 'q3a1',
      q4d: 'q4d1',
      q6: 'q6a1',
      q8: 'q8a1',
    };

    Object.keys(dependencies).forEach(key => {
      const controlName = dependencies[key];
      const control = this.questionnaires.get(controlName);
      if (control) {
        this.questionnaires.get(key)?.valueChanges.subscribe((value: boolean) => {
          if (value) {
            control.setValidators([Validators.required]);
          } else {
            control.clearValidators();
          }
          control.updateValueAndValidity();
        });
      }
    });
  }

  ngOnInit() {

    const formControlsConfig: { [key: string]: any } = this.formControlNames.reduce((config: { [key: string]: any }, controlName: string) => {
      if (controlName === 't1' || controlName === 't2' || controlName === 't3' || controlName === 't4') {
        config[controlName] = [null, Validators.required];
      } else {
        config[controlName] = null;
      }
      return config;
    }, {});

    this.questionnaires = this.fb.group(formControlsConfig);

    this.setupFieldDependencies();

    this.loading = true;
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
      console.log(this.decryptedId)
    } else {
      console.log('Encrypted message not found.');
    }

    this.donorService.getDonorInfo(this.decryptedId)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      ).subscribe((res: any) => {
      this.historyService.getRecord(res.userId)
        .pipe(
          catchError(err => {
            if (err.status === 404) {
              this.history = [];
              this.loading = false;
              return of(null);
            }
            return throwError(err);
          })
        ).subscribe((res: any) => {
          if (res !== null){
            this.history = res;
            this.loading= false;
          } else {
            this.history = [];
            this.loading= false;
          }
      });
    });
  }

  submitForm(){
    console.log(this.regForm.value);
    this.currentPage++;
  }

  isDisabledDate = (current: Date): boolean => {
    const today = new Date();
    return current > today;
  };

  get t1(): AbstractControl {
    return this.questionnaires.get('t1')!;
  }
  get t2(): AbstractControl {
    return this.questionnaires.get('t2')!;
  }
  get t3(): AbstractControl {
    return this.questionnaires.get('t3')!;
  }
  get t4(): AbstractControl {
    return this.questionnaires.get('t4')!;
  }

  show(){
    Object.keys(this.questionnaires.controls).forEach(key => {
      const control = (this.questionnaires.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if( this.t1.invalid || this.t2.invalid || this.t3.invalid || this.t4.invalid){
      this.isConsent = true;
      return;
    }
    if (this.questionnaires.invalid) {
      this.message.error('Please fill in all required field');
      return;
    }
    this.isConsent = false;
    console.log(this.questionnaires.value);
  }

}
