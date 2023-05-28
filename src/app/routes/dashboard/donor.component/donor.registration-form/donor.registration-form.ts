import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {catchError, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {History} from "../../../../shared/model/history.model";
import { messageConstant } from "../../../../shared/utils/constant";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {RegistrationService} from "../../../../shared/services/registration.service";

@Component({
  selector: 'app-donor-registration-component',
  templateUrl: './donor.registration-form.html',
  styleUrls: ['./donor.registration-form.css']
})
export class DonorRegistrationForm implements OnInit {
  questionnaires!: FormGroup;
  formControlNames = [
    'q1', 'q2', 'q3', 'q3a', 'q3a1', 'q4a', 'q4a1','q4b', 'q4c', 'q4d', 'q4d1', 'q5a', 'q5b', 'q5c', 'q5d' ,
     'q5e', 'q5f', 'q5g', 'q5h', 'q5i', 'q5j', 'q5k', 'q5l', 'q5m', 'q5n','q5n1','q6', 'q6a1', 'q7a', 'q7b', 'q7c',
    'q8', 'q8a1', 'q9', 'q10', 'q11', 'q12a', 'q12b', 'q12c', 'q12d', 'q13a', 'q13b', 'q13c','q14a', 'q14b', 'q14c', 'q14d',
    'q14e', 'q14f', 'q14g', 'q14h', 'q14i', 'q15a', 'q15b','q15c','q15d','t1','t2', 't3','t4',
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private registrationService: RegistrationService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }
  protected readonly messageConstant = messageConstant;
  loading = false;
  error: string = "";
  decryptedId: string = "";
  formatDOB: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  hash: string = "";
  history: History[]=[];
  currentPage = 1;
  isConsent = false;

  ethnic = [
    {value: 'Malay'},
    {value: 'Chinese'},
    {value: 'Indian'},
    {value: 'Iban'},
    {value: 'Kadazan'},
    {value: 'Melanau'},
    {value: 'Murut'},
    {value: 'Bidayuh'},
    {value: 'Bajau'},
  ];

  maritial = [
    {value: 'Single'},
    {value: 'Married'},
    {value: 'Widowed/Divorced'}
  ];

  states = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Kuala Lumpur',
    'Labuan',
    'Putrajaya'
  ];

  stateOptions = this.states.map(state => ({value: state}));

  regForm = this.fb.nonNullable.group({
    name: ['',[Validators.required, Validators.pattern(/^[A-Za-z' ]+$/)]],
    ic: ['',[Validators.required, Validators.pattern(/^\d{12}$/)]],
    dob: ['',Validators.required],
    age: [null,Validators.required],
    ethnic: [null,Validators.required],
    maritial: [null,Validators.required],
    occupation: [null,Validators.required],
    homeTel: [null],
    hpTel: [null,Validators.required],
    currentAd: [null,Validators.required],
    state: [null,Validators.required],
    postcode: [null,[Validators.required, Validators.pattern(/^\d{5}$/)]],
  })

  setupFieldDependencies() {
    const dependencies: { [key: string]: string } = {
      q4a: 'q4a1',
      q3a: 'q3a1',
      q4d: 'q4d1',
      q5n: 'q5n1',
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

  translateDate(date: FormControl<any>): string {
    const selectedDate: Date | null = date.value;
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      return formattedDate;
    }
    return '';
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
    });
  }

  submitForm(){
    this.formatDOB = this.translateDate(this.regForm.get('dob') as FormControl);
    this.regForm.get('dob')?.setValue(this.formatDOB);
    Object.keys(this.regForm.controls).forEach(key => {
      const control = (this.regForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.regForm.invalid) {
      return;
    }
    this.currentPage++;
  }

  isDisabledDate = (current: Date): boolean => {
    const today = new Date();
    return current > today;
  };

  areFormControlsInvalid(controlNames: string[]): boolean {
    return controlNames.some(controlName => this.questionnaires.get(controlName)?.invalid);
  }

  nextPage(){
    this.currentPage++;
  }

  previousPage(){
    this.currentPage--;
  }


  show(){
    Object.keys(this.questionnaires.controls).forEach(key => {
      const control = (this.questionnaires.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.areFormControlsInvalid(['t1', 't2', 't3', 't4'])) {
      this.isConsent = true;
      return;
    }
    if (this.questionnaires.invalid) {
      this.message.error('Please fill in all required field');
      return;
    }
    this.isConsent = false;
    this.loading = true;
    let postData ={
      regForm: this.regForm.value,
      formFields: this.questionnaires.value
    };
    this.registrationService.addRecord(postData)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      ).subscribe((res: any) => {
        this.loading = false;
        this.message.success(res);
        this.currentPage=4;
    });
  }
}
