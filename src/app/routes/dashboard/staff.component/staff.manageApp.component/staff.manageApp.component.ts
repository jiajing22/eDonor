import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppointmentService} from "../../../../shared/services/appointment.service";
import {Appointment} from "../../../../shared/model/appointment.model";
import {messageConstant} from "../../../../shared/utils/constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-staff-manage-app-component',
  templateUrl: './staff.manageApp.component.html',
  styleUrls: ['./staff.manageApp.component.css']
})
export class StaffManageAppComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private appointmentService: AppointmentService,
    private message: NzMessageService,
    private router: Router,
  ) {
  }

  loading = false;
  error: string = "";
  decryptedId: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  appointmentList: Appointment[] = [];
  isLoading = false;
  isVisible = false;
  isAccept = false;
  postData: any;
  initLoad = false;

  listOfColumn = [
    {title: 'Donor IC'},
    {title: 'Appointment Date'},
    {title: 'Location'},
    {title: 'Time'},
    {title: 'Status'},
    {title: 'Action'},
  ];

  ngOnInit() {
    this.authenticate();
    this.loadList();
  }

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Staff') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
    }
  }

  loadList() {
    this.initLoad = true;
    this.appointmentService.getAppointmentList()
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.appointmentList = res;
        this.appointmentList.sort((a: any, b: any) => {
          const dateA = new Date(a.appmntDate);
          const dateB = new Date(b.appmntDate);
          return dateB.getTime() - dateA.getTime();
        });
        this.initLoad = false;
      });
  }

  getStatusColor(status: string): string {
    const colorMap: { [status: string]: string } = {
      Pending: 'processing',
      Accepted: 'success',
      Rejected: 'error',
      Expired: 'default'
    };
    return colorMap[status] || 'default';
  }

  isPending(status: string): boolean {
    return status === 'Pending';
  }

  updateStatus() {
    this.isLoading = true;
    this.appointmentService.updateAppStatus(this.postData)
      .subscribe((res: any) => {
        setTimeout(() => {
          this.message.success('Appointment Status Update');
          this.isVisible = false;
          this.isLoading = false;
          this.isAccept = false;
          this.loadList();
        }, 1500);

      });
  }

  showModal(status: string, data: any) {
    this.isVisible = true;
    if (status === 'Accepted') {
      this.isAccept = true;
    } else {
      this.isAccept = false;
    }
    this.postData = {...data, aStatus: status};
  }

  handleCancel() {
    this.isVisible = false;
  }

  protected readonly messageConstant = messageConstant;
}
