import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {catchError, of, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {HistoryService} from "../../../../shared/services/history.service";
import {History} from "../../../../shared/model/history.model";

@Component({
  selector: 'app-donor-view-history-component',
  templateUrl: './donor.history.html',
  styleUrls: ['./donor.history.css']
})
export class DonorHistory implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private historyService: HistoryService,
    private message: NzMessageService,
    private router: Router
  ) {
  }

  loading = false;
  error: string = "";
  decryptedId: string = "";
  donorIc: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  history: History[]=[];
  listOfColumn = [
    {
      title: 'Donate Date',
      compare: (a: History, b: History) => a.donateDate.localeCompare(b.donateDate),
    },
    {
      title: 'Blood Serial No.',
      compare: (a: History, b: History) => a.bloodSerialNo.localeCompare(b.bloodSerialNo),
    },
    {
      title: 'Amount(ml)',
      compare: (a: History, b: History) => a.amount - b.amount,
    },
    {
      title: 'Hospital',
      compare: (a: History, b: History) => a.dHospital.localeCompare(b.dHospital),
    },
    {
      title: 'Remark',
      compare: (a: History, b: History) => {
        const remarkA = a.recRemark || '';
        const remarkB = b.recRemark || '';
        return remarkA.localeCompare(remarkB);
      },
    }
  ];

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Donor') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }
  }

  ngOnInit() {
    this.authenticate();
    this.loading = true;
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
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

}
