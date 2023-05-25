import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {NzSafeAny} from "ng-zorro-antd/core/types";
import * as CryptoJS from "crypto-js";
import {catchError, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {RecordService} from "../../../../shared/services/record.service";

@Component({
  selector: 'app-staff-record-form',
  templateUrl: './staff.recordForm.html',
  styleUrls: ['./staff.recordForm.css']
})
export class StaffRecordForm implements OnInit {
  // form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private recordService: RecordService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, this.sKey);
      this.decryptedId = item.toString(CryptoJS.enc.Utf8);
    } else {
      console.log('Encrypted message not found.');
    }
  }

  loading = false;
  loadingSubmit = false;
  fRegDate: string = '';
  fLastDonateDate: string = '';
  error: string = "";
  decryptedId: string = "";
  sKey = "x^XICt8[Lp'Gm<8";
  currentPage = 1;
  time = new Date();

  getFormFields(): any[] {
    return [
      {label: 'IC', value: this.first.get('ic')?.value || '-' },
      {label: 'Full Name', value: this.first.get('fullName')?.value || '-'},
      {label: 'Blood Serial No.', value: this.first.get('bloodSerialNo')?.value || '-'},
      {label: 'Type of Donor', value: this.first.get('donorType')?.value || '-'},
      {label: 'Donor Eligibility Status', value: this.first.get('status')?.value || '-'},
      {label: 'Blood Centre', value: this.first.get('bloodCentre')?.value || '-'},
      {label: 'Registration Date', value: this.fRegDate || '-'},
      {label: 'Last Donation Date', value: this.fLastDonateDate || '-'},
      {label: 'Weight', value: this.second.get('weight')?.value || '-'},
      {label: 'Blood Group', value: this.second.get('bloodGroup')?.value || '-'},
      {label: 'Hb Level', value: this.second.get('hbLevel')?.value || '-'},
      {label: 'Pre-donation Platelet Amount', value: this.second.get('pAmount')?.value || '-'},
      {label: 'Blood Pressure', value: this.second.get('bloodPressure')?.value || '-'},
      // Add more form fields as needed
    ];
  }

  getSubFormFields(): any[] {
    return [
      {label: 'Donate Type', value: this.second.get('doubleCheckEOption')?.value || '-'},
      {label: 'Volume', value: this.second.get('volume')?.value  || '-'},
      {label: 'Confidential Unit Exclusion.', value: this.second.get('isCUE')?.value  || '-'},
    ];
  }

  getSub2FormFields(): any[] {
    return [
      {label: 'Reason', value: this.second.get('reason')?.value || '-'},
      {label: 'Deferral Status', value: this.second.get('deferralStatus')?.value || '-'},
      {label: 'Duration.', value: this.second.get('duration')?.value || '-'},
    ];
  }

  getContFormFields(): any[] {
    return [
      {label: 'Venepuncture Performed By', value: this.third.get('venepuncture')?.value || '-' },
      {label: 'Anaesthetic Given?', value: this.third.get('isGiven')?.value || '-' },
      {label: 'Time Donation Started.', value: this.third.get('timeStart')?.value || '-' },
      {label: 'Sample Taken?', value: this.third.get('isTaken')?.value || '-' },
      {label: 'Time Donation Ended.', value: this.third.get('timeEnd')?.value || '-' },
      {label: 'Remaining Barcodes', value: this.third.get('remainingBarcodes')?.value || '-' },
      {label: 'Notes / Comment (if any)', value: this.third.get('notes')?.value || '-' },
    ];
  }

  selectOptions = [
    {value: 'A+', label: 'A positive (A+)'},
    {value: 'A-', label: 'A negative (A-)'},
    {value: 'B+', label: 'B positive (B+)'},
    {value: 'B-', label: 'B negative (B-)'},
    {value: 'AB+', label: 'AB positive (AB+)'},
    {value: 'AB-', label: 'AB negative (AB-)'},
    {value: 'O+', label: 'O positive (O+)'},
    {value: 'O-', label: 'O negative (O-)'}
  ];

  //Get from DB
  bloodCentreOptions = [
    {value: 'Pusat Darah Negara', label: 'Pusat Darah Negara'},
    {
      value: 'Unit Transfusi Perubatan, Hospital Sultanah Aminah',
      label: 'Unit Transfusi Perubatan, Hospital Sultanah Aminah'
    },
    {
      value: 'Unit Transfusi Perubatan, Hospital Tuanku Jaafar',
      label: 'Unit Transfusi Perubatan, Hospital Tuanku Jaafar'
    },
    {
      value: 'Unit Transfusi Perubatan Hospital Melaka',
      label: 'Unit Transfusi Perubatan Hospital Melaka'
    },
    {
      value: 'Unit Transfusi Perubatan Hospital Tengku Ampuan Rahimah',
      label: 'Unit Transfusi Perubatan Hospital Tengku Ampuan Rahimah'
    }
  ];

  first = this.fb.nonNullable.group({
    ic: ['001027011138', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    fullName: ['John Doe', [Validators.required, Validators.pattern(/^[A-Za-z' ]+$/)]],
    bloodSerialNo: ['e43413113', [Validators.required]],
    donorType: ['Regular/Repeat Donor', [Validators.required]],
    status: ['Not Eligible', [Validators.required]],
    regDate: ['', [Validators.required]],
    lastDonateDate: ['', [Validators.required]],
    bloodCentre: ['', [Validators.required]],
  });

  second = this.fb.nonNullable.group({
    weight: [66, [Validators.required]],
    bloodGroup: ['A+', [Validators.required]],
    hbLevel: ['femaleLess', [Validators.required]],
    pAmount: [12, [Validators.required]],
    bloodPressure: ['120-140', [Validators.required]],
    doubleCheckE: ['', [Validators.required]],
    doubleCheckEOption: ['', [Validators.required]],
    volume: [null, [Validators.required]],
    isCUE: [null],
    reason: ['', [Validators.required]],
    deferralStatus: ['', [Validators.required]],
    duration: [''],
  });

  third = this.fb.nonNullable.group({
      venepuncture: [null],
      isGiven: ['', [Validators.required]],
      timeStart: ['12:54', [Validators.required]],
      isTaken: [null, [Validators.required]],
      timeEnd: ['13:05', [Validators.required]],
      remainingBarcodes: [null, [Validators.required]],
      notes: [null],
    }
  );

  get reason(): AbstractControl {
    return this.second.get('reason')!;
  }

  get deferralStatus(): AbstractControl {
    return this.second.get('deferralStatus')!;
  }

  get doubleCheckEOption(): AbstractControl {
    return this.second.get('doubleCheckEOption')!;
  }

  get volume(): AbstractControl {
    return this.second.get('volume')!;
  }

  get isCUE(): AbstractControl {
    return this.second.get('isCUE')!;
  }

  onRadioChange(value: string) {
    if (value === 'yes') {
      this.deferralStatus.setValue(null);
      this.reason.setValue(null);
    } else {
      this.doubleCheckEOption.setValue(null);
      this.volume.setValue(null);
      this.isCUE.setValue(null);
    }
  }

  secondPage() {
    this.loading = true;
    this.error = '';
    Object.keys(this.first.controls).forEach(key => {
      const control = (this.first.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });

    if (this.first.invalid) {
      return;
    }
    this.fRegDate = this.translateDate(this.first.get('regDate') as FormControl);
    this.fLastDonateDate = this.translateDate(this.first.get('lastDonateDate') as FormControl);
    this.currentPage++;
  }

  lastPage() {
    this.error = '';
    Object.keys(this.second.controls).forEach(key => {
      const control = (this.second.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });

    if (this.second.get('doubleCheckE')?.value === 'yes') {
      this.reason.clearValidators();
      this.reason.updateValueAndValidity();
      this.deferralStatus.clearValidators();
      this.deferralStatus.updateValueAndValidity();
    } else if (this.second.get('doubleCheckE')?.value === 'no') {
      this.doubleCheckEOption.clearValidators();
      this.doubleCheckEOption.disabled;
      this.doubleCheckEOption.updateValueAndValidity();
      this.volume.clearValidators();
      this.volume.updateValueAndValidity();
    }

    if (this.second.invalid) {
      return;
    }
    this.currentPage++;
  }

  confirm(): void {
    this.error = '';
    Object.keys(this.third.controls).forEach(key => {
      const control = (this.third.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });

    if (this.third.invalid) {
      return;
    }
    this.currentPage++;
  }

  submit(): void {
    this.loadingSubmit = true;
    let postData = {
      donorIc: this.first.get('ic')?.value,
      fullName: this.first.get('fullName')?.value,
      bloodSerialNo: this.first.get('bloodSerialNo')?.value,
      donorType: this.first.get('donorType')?.value,
      status: this.first.get('status')?.value,
      regDate: this.fRegDate,
      lastDonateDate: this.fLastDonateDate,
      bloodCentre: this.first.get('bloodCentre')?.value,
      weight: this.second.get('weight')?.value,
      bloodGroup: this.second.get('bloodGroup')?.value,
      hbLevel: this.second.get('hbLevel')?.value,
      pAmount: this.second.get('pAmount')?.value,
      bloodPressure: this.second.get('bloodPressure')?.value,
      doubleCheckE: this.second.get('doubleCheckE')?.value,
      doubleCheckEOption: this.second.get('doubleCheckEOption')?.value,
      volume: this.second.get('volume')?.value,
      isCUE: this.second.get('isCUE')?.value,
      reason: this.second.get('reason')?.value,
      deferralStatus: this.second.get('deferralStatus')?.value,
      venepuncture: this.third.get('venepuncture')?.value,
      isGiven: this.third.get('isGiven')?.value,
      timeStart: this.third.get('timeStart')?.value,
      isTaken: this.third.get('isTaken')?.value,
      timeEnd: this.third.get('timeEnd')?.value,
      remainingBarcodes: this.third.get('remainingBarcodes')?.value,
      recRemark: this.third.get('notes')?.value,
      staffId: this.decryptedId
    }
    console.log(postData);

    this.recordService.addRecord(postData)
      .pipe(
        catchError(err => {
          this.message.error(err.error);
          // this.loading = false;
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 1000);

          return throwError(err);
        })
      ).subscribe((res: any) => {
      this.loadingSubmit = false;
      this.currentPage++;
    })
  }

  new() {
    this.first.reset();
    this.second.reset();
    this.third.reset();
    this.currentPage = 1;
  }

  previousPage(): void {
    if (this.currentPage === 4) {
      this.currentPage = 1;
    } else {
      this.currentPage--;
    }
    if (this.currentPage === 2) {
      this.reason.setValidators([Validators.required]);
      this.deferralStatus.setValidators([Validators.required]);
      this.doubleCheckEOption.setValidators([Validators.required]);
      this.volume.setValidators([Validators.required]);
    }
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

  formatOutput(input: any, field: string): string {
    let output = '';

    if (field === 'status') {
      switch (input) {
        case 'yes':
          output = 'Eligible';
          break;
        case 'no':
          output = 'Not Eligible';
          break;
        default:
          output = 'Unknown';
          break;
      }
    }
    return output;
  }

  disabledFutureDate = (current: Date): boolean => {
    const today = new Date();
    return current > today;
  }
}
