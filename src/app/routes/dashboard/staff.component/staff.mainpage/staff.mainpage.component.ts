import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppointmentService} from "../../../../shared/services/appointment.service";
import * as CryptoJS from "crypto-js";
import { messageConstant } from "../../../../shared/utils/constant";
import {NzMessageService} from "ng-zorro-antd/message";
import {StaffService} from "../../../../shared/services/staff.service";

@Component({
  selector: 'app-staff-mainpage-component',
  templateUrl: './staff.mainpage.component.html',
  styleUrls: ['./staff.mainpage.component.css']
})
export class StaffMainPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private appointmentService: AppointmentService,
    private staffService: StaffService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  loading=false;
  fullList: any[] = [];
  nearestApp: any[] = [];
  decryptedId:any='';
  userName:any='';

  ngOnInit(): void {
    this.authenticate()
    this.loading = true;
    this.loadUser();
    this.loadDash();
  }

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Staff') {
      this.msg.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }
  }

  loadUser(){
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, messageConstant.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    } else {
      this.msg.error('You are not logged in!');
    }

    this.staffService.getStaffInfo(this.decryptedId)
      .subscribe((res:any)=>{
        this.userName = res.fullName;
      });
  }

  loadDash(){
    this.appointmentService.getAppointmentList()
      .subscribe((res:any)=>{
        this.fullList=res;
        const currentDate = new Date();
        this.nearestApp = this.fullList
          .filter(app => {
            const appDate = new Date(app.appmntDate);
            return appDate >= currentDate || appDate.toDateString() === currentDate.toDateString();
          })
          .sort((a, b) => {
            const dateA = new Date(a.appmntDate);
            const dateB = new Date(b.appmntDate);

            if (dateA.getTime() === dateB.getTime()) {
              const timeA = a.timeslot.split(':').map(Number);
              const timeB = b.timeslot.split(':').map(Number);

              if (timeA[0] === timeB[0]) {
                return timeA[1] - timeB[1];
              } else {
                return timeA[0] - timeB[0];
              }
            } else {
              return dateA.getTime() - dateB.getTime();
            }
          })
          .slice(0, 5);
        this.loading = false;
      });
  }

  getStatusColor(status: string): string {
    const colorMap: { [status: string]: string } = {
      Pending: 'processing',
      Accepted: 'success',
      Expired: 'error'
    };
    return colorMap[status] || 'default';
  }

}
