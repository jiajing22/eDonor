import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import * as CryptoJS from "crypto-js";
import {catchError, finalize, of, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {StaffService} from "../../../../shared/services/staff.service";
import {Router} from "@angular/router";
import {HistoryService} from "../../../../shared/services/history.service";
import {History} from "../../../../shared/model/history.model";
import { messageConstant } from "../../../../shared/utils/constant";

@Component({
  selector: 'app-donor-view-history-component',
  templateUrl: './donor.registration-form.html',
  styleUrls: ['./donor.registration-form.css']
})
export class DonorRegistrationForm implements OnInit {
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

  questionnaires = this.fb.nonNullable.group({
    q1: [null],
    q2: [null],
    q3: [null],
    q4: [null],
    ql5: [null],
    q6: [null],
    q7: [null],
    q8: [null],
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

  show(){
    console.log(this.questionnaires.value);
  }

}
