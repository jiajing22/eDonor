import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppointmentService} from "../../../../shared/services/appointment.service";
import {Appointment} from "../../../../shared/model/appointment.model";

@Component({
  selector: 'app-staff-manage-app-component',
  templateUrl: './staff.manageApp.component.html',
  styleUrls: ['./staff.manageApp.component.css']
})
export class StaffManageAppComponent implements OnInit{
  constructor(
    private cdr: ChangeDetectorRef,
    private appointmentService: AppointmentService,
    private message: NzMessageService,
  ) {
  }

  loading= false;
  error: string = "";
  decryptedId: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  appointmentList: Appointment[]=[];
  selectedData: any;
  isLoading = false;

  listOfColumn = [
    {title: 'Donor IC'},
    {title: 'Appointment Date'},
    {title: 'Location'},
    {title: 'Time'},
    {title: 'Status'},
    {title: 'Action'},
  ];

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.appointmentService.getAppointmentList()
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      ).subscribe((res: any) => {
      console.log(res);
      this.appointmentList = res;
    });
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
      Rejected: 'error',
      Expired: 'default'
    };

    return colorMap[status] || 'default';
  }

  isPending(status: string):boolean{
    return status === 'Pending';
  }

  // updateStatus(data:Appointment, status: string){
  //   let postData = {...data};
  //   postData.aStatus = status;
  //
  //   this.appointmentService.updateAppStatus(postData)
  //     .subscribe((res:any)=>{
  //       this.message.success('Appointment Status Update');
  //       this.loadList();
  //     });
  // }
  beforeConfirm(data: any): Observable<boolean> {
    return new Observable(observer => {
      // Simulating an asynchronous operation with a timeout
      setTimeout(() => {
        const confirmed = confirm('Are you sure to update the status?');
        observer.next(confirmed);
        observer.complete();
      }, 3000);
    });
  }

  updateStatus(data: any, status: string) {
    this.beforeConfirm(data).subscribe(confirmed => {
      if (confirmed) {
        // Proceed with the status update logic
        let postData = { ...data, aStatus: status };
        this.appointmentService.updateAppStatus(postData)
          .subscribe((res: any) => {
            this.message.success('Appointment Status Update');
            this.loadList();
          });
      } else {
        // Cancel the status update
        console.log('Status update canceled');
      }
    });
  }


}
