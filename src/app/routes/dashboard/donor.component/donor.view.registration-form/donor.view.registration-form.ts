import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {catchError, of, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {History} from "../../../../shared/model/history.model";
import {RegistrationService} from "../../../../shared/services/registration.service";

@Component({
  selector: 'app-donor-view-history-component',
  templateUrl: './donor.view.registration-form.html',
  styleUrls: ['./donor.view.registration-form.css']
})
export class DonorViewRegistrationForm implements OnInit {
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

  loading = false;
  error: string = "";
  decryptedId: string = "";
  donorIc: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  history: History[]=[];
  currentPage=1;
  dataForm: any[] = [];
  item: any;
  regForm = this.fb.nonNullable.group({
    name: ['',[Validators.required, Validators.pattern(/^[A-Za-z' ]+$/)]],
    ic: ['',[Validators.required, Validators.pattern(/^\d{12}$/)]],
    dob: ['',Validators.required],
    age: [null,Validators.required],
    ethnic: [null,Validators.required],
    maritial: [null,Validators.required],
    occupation: ['',Validators.required],
    homeTel: [null],
    hpTel: [null,Validators.required],
    currentAd: [null,Validators.required],
    state: [null,Validators.required],
    postcode: [null,[Validators.required, Validators.pattern(/^\d{5}$/)]],
  })

  ngOnInit() {
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
        this.donorIc = res.userId;

        this.registrationService.getFormList(res.userId)
          .pipe(
            catchError(err => {
              if (err.status === 404) {
                this.history = [];
                this.loading = false;
                return of(null);
              }
              return throwError(err);
            })
          ).subscribe((res:any) => {
          if (res) {
            this.dataForm = res.map((item:any) => ({
              title: this.formatTimestamp(item.regForm.submitTime),
              status:item.regForm.formStatus,
              regForm: item.regForm,
              formFields: item.formFields
            }));
          }
        });
    });

    const formControlsConfig: { [key: string]: any } = this.formControlNames.reduce((config: { [key: string]: any }, controlName: string) => {
      if (controlName === 't1' || controlName === 't2' || controlName === 't3' || controlName === 't4') {
        config[controlName] = [null, Validators.required];
      } else {
        config[controlName] = null;
      }
      return config;
    }, {});

    this.questionnaires = this.fb.group(formControlsConfig);
  }

  formatTimestamp(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  showModal(item:any){
    this.regForm.patchValue(item.regForm);
    this.item = item;
    this.currentPage = 2;
  }

  previousPage(){
    this.currentPage--;
  }

  nextPage(item:any){
    this.questionnaires.patchValue(item.formFields)
    this.currentPage = 3;
  }

  getStatusColor(status: string): string {
    const colorMap: { [status: string]: string } = {
      submitted: 'processing',
      accepted: 'success',
      expired: 'error'
    };

    return colorMap[status] || 'default';
  }
}
