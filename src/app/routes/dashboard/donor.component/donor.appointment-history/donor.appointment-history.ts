import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {catchError, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppointmentService} from "../../../../shared/services/appointment.service";
import {Appointment} from "../../../../shared/model/appointment.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-donor-view-history-component',
  templateUrl: './donor.appointment-history.html',
  styleUrls: ['./donor.appointment-history.css']
})
export class DonorAppointmentHistory implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private appointmentService: AppointmentService,
    private message: NzMessageService,
    private router: Router
  ) {
  }

  loading = false;
  error: string = "";
  decryptedId: string = "";
  isVisible = false;
  sKey = "x^XICt8[Lp'Gm<8";
  appointmentList: Appointment[]=[];
  selectedData: any;
  listOfColumn = [
    {title: 'Appointment Date'},
    {title: 'Location'},
    {title: 'Time'},
    {title: 'Status'},
    {title: 'Details'},
  ];

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
        let postData = {
          donorId : res.userId
        }
      this.appointmentService.getAppointmentByUser(postData)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            return throwError(err);
          })
        ).subscribe((res: any) => {
          if(res) {
            this.appointmentList = res;
            const order = ['Pending', 'Accepted', 'Rejected', 'Expired'];
            this.appointmentList.sort((a, b) => {
              const statusComparison = order.indexOf(a.aStatus) - order.indexOf(b.aStatus);

              if (statusComparison !== 0) {
                return statusComparison;
              }
              else {
                // Sort by the most recent appmntDate if the status is the same
                const dateA = new Date(a.appmntDate).getTime();
                const dateB = new Date(b.appmntDate).getTime();
                return dateB - dateA;
              }
            });
            this.loading= false;
          } else {
            this.loading = false;
          }
      });
    });
  }

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Donor') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }
  }

  getFormFields() {
    return [
      {label: 'IC', value: this.selectedData.donorId || '-'},
      {label: 'Location', value: this.selectedData.appmntLocation || '-'},
      {label: 'Appointment Date', value: this.selectedData.appmntDate|| '-'},
      {label: 'Selected Time Slot', value: this.selectedData.timeslot || '-'},
      {label: 'Status', value: this.selectedData.aStatus || '-'},
    ];
  }

  getStatusColor(status: string): string {
    const colorMap: { [status: string]: string } = {
      Pending: 'processing',
      Accepted: 'success',
      Expired: 'error'
    };

    return colorMap[status] || 'default';
  }

  show(data:any){
    this.selectedData = data;
    this.isVisible = true;
  }

  handleCancel(){
    this.isVisible = false;
  }

}
