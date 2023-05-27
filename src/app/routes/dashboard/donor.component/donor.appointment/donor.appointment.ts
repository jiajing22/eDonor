import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import * as CryptoJS from "crypto-js";
import {catchError, throwError} from "rxjs";
import {DonorService} from "../../../../shared/services/donor.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {BdcentreService} from "../../../../shared/services/bdcentre.service";
import { RANDOM_MESSAGE } from "../../../../shared/utils/constant";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {AppointmentService} from "../../../../shared/services/appointment.service";

@Component({
  selector: 'app-donor-appointment-component',
  templateUrl: './donor.appointment.html',
  styleUrls: ['./donor.appointment.css']
})
export class DonorAppointment implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bdCentreService: BdcentreService,
    private message: NzMessageService,
    private donorService: DonorService,
    private appointmentService: AppointmentService,
  ) {
  }

  donationCentres: { value: string, label: string }[] = [];
  availableSlotsMap: { name: string, timeSlot: string[] }[] = [];
  selectedCentre: string = '';

  sKey = "x^XICt8[Lp'Gm<8";
  decryptedId: string = "";
  isLoading = true;
  isVisible = false;
  appDate='';
  isConfirmVisible = false;
  isSuccess = false;
  confirmLoading = false;
  bookLoading = false;
  protected readonly RANDOM_MESSAGE = RANDOM_MESSAGE;

  bookForm = this.fb.nonNullable.group({
    name: ['',Validators.required],
    ic: ['',Validators.required],
    location: ['',Validators.required],
    timeSlot: ['',Validators.required],
    date: ['',Validators.required],
    agreement: [false,Validators.requiredTrue],
  })

  nameControl: FormControl = this.bookForm.get('name') as FormControl;
  icControl: FormControl = this.bookForm.get('ic') as FormControl;

  getFormFields(): any[] {
    return [
      {label: 'IC', value: this.bookForm.get('ic')?.value || '-' },
      {label: 'Full Name', value: this.bookForm.get('name')?.value || '-'},
      {label: 'Location', value: this.bookForm.get('location')?.value || '-'},
      {label: 'Appointment Date', value: this.appDate || '-'},
      {label: 'Selected Time Slot', value: this.bookForm.get('timeSlot')?.value || '-'},
    ];
  }

  ngOnInit() {
    this.bdCentreService.getAllCentre()
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.donationCentres = res.map((item: any) =>
          ({value: item.centreName, label: item.centreName}));
        this.updateAvailableTimeslots(res);
        this.isLoading=false;
      });

    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    } else {
      console.log('Encrypted message not found.');
    }
    this.donorService.getDonorInfo(this.decryptedId)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.nameControl.setValue(res.fullName);
        this.nameControl.disable();
        this.nameControl.markAsDirty();
        this.nameControl.updateValueAndValidity();
        this.icControl.setValue(res.userId);
        this.icControl.disable();
        this.icControl.markAsDirty();
        this.icControl.updateValueAndValidity();
      });
  }

  submitForm() {
    Object.keys(this.bookForm.controls).forEach(key => {
      const control = (this.bookForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.bookForm.invalid) {
      return;
    }
    this.appDate = this.translateDate(this.bookForm.get('date') as FormControl);
    setTimeout(() => {this.bookLoading=true; this.isConfirmVisible = true;}, 1000);
  }

  updateAvailableTimeslots(data: any[]): void {
    this.availableSlotsMap = [];

    data.forEach((center: any) => {
      const workHourStart = center.workHourStart;
      const workHourEnd = center.workHourEnd;

      if (workHourStart && workHourEnd) {
        const centerTimeSlots = this.generateTimeSlots(workHourStart, workHourEnd);
        this.availableSlotsMap.push({ name: center.centreName, timeSlot: centerTimeSlots });
      }
    });
  }

  generateTimeSlots(startTime: string, endTime: string): string[] {
    const startHour = Number(startTime.split(':')[0]);
    const endHour = Number(endTime.split(':')[0]);

    const timeSlots: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (const minute of ['00', '30']) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }

    return timeSlots;
  }

  getSelectedCentreTimeSlots(): string[] {
    const selectedCentreData = this.availableSlotsMap.find(item => item.name === this.selectedCentre);
    return selectedCentreData ? selectedCentreData.timeSlot : [];
  }

  onCentreSelect(centreName: string): void {
    this.selectedCentre = centreName;
  }

  isDisabledDate = (current: Date): boolean => {
    const today = new Date();
    return current < today;
  };

  showModal(){
    this.isVisible = true;
  }

  handleCancel(){
    this.isVisible = false;
    this.isConfirmVisible = false;
    this.bookLoading = false;
  }

  handleOk(){
    this.bookForm.get('agreement')?.setValue(true);
    this.isVisible=false;
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

  confirm(){
    this.confirmLoading = true;

    let postData={
      appmntDate: this.appDate,
      timeslot: this.bookForm.get('timeSlot')?.value,
      appmntLocation: this.bookForm.get('location')?.value,
      aStatus: 'Pending',
      donorId: this.bookForm.get('ic')?.value,
    }

    this.appointmentService.addAppointment(postData)
      .pipe(
        catchError(err => {
          this.message.error(err);
          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.message.success(res);
        setTimeout(() => {
          this.isSuccess = true;
        }, 2000);

      });
  }

  navigate(){
    window.location.reload();
  }
}
