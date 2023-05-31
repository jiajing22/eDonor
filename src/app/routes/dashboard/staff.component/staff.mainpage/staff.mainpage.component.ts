import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Donor} from "../../../../shared/model/donor.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentService} from "../../../../shared/services/appointment.service";

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
  ) {}
  donor: Donor[] = [];

  loading=false;
  fullList: any[] = [];
  nearestApp: any[] = [];

  ngOnInit(): void {
    this.loading = true;
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
        console.log(this.nearestApp);
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
