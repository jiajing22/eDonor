import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DonorService } from '../../../../shared/services/donor.service';
import { StaffService } from '../../../../shared/services/staff.service';

@Component({
  selector: 'app-admin-manage-staff-component',
  templateUrl: './admin.manage.staff.component.html',
  styles: [``]
})
export class AdminManageStaffComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private staffService: StaffService,
    private message: NzMessageService
  ) {}

  loading: boolean = false;
  staff: any;
  isVisible = false;
  isEdit = false;
  isUpdateLoading = false;
  isConfirmLoading = false;
  list: any[] = [];
  passwordVisible = false;
  password?: string;
  currId: string = '';

  ngOnInit(): void {
    this.loadData();
    this.addNewForm.get('fullName')?.valueChanges.subscribe((value: string) => {
      if (value) {
        this.addNewForm.get('fullName')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  loadData() {
    this.loading = true;
    this.staffService.getAllStaff().subscribe((res: any) => {
      this.staff = res;
      this.loading = false;
    });
  }

  addNewForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    // userId: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    staffPosition: ['', Validators.required],
    deptName: ['', Validators.required],
    deptArea: ['', Validators.required]
  });

  handleOk(): void {
    Object.keys(this.addNewForm.controls).forEach(key => {
      const control = (this.addNewForm.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });

    if (this.addNewForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.isUpdateLoading = true;
      let postData = { ...this.addNewForm.value, donorId: this.currId };
      this.donorService.updateDonorInfo(postData).subscribe((res: any) => {
        if (res != null) {
          this.message.success('Record updated successfully');
          setTimeout(() => {
            this.isVisible = false;
            this.isUpdateLoading = false;
            this.isEdit = false;
          }, 2000);
          this.loadData();
        } else {
          this.message.error('Record updated failed');
          this.isUpdateLoading = false;
        }
      });
    } else {
      this.isConfirmLoading = true;
      let postData = { ...this.addNewForm.value };
      this.donorService.register(postData).subscribe((res: any) => {
        this.isConfirmLoading = false;
        if (res === 'Existing document ID') {
          this.message.error('User Added Failed!');
        } else if (res === 'registeredIc') {
          this.message.error('The IC Number is already been registered.');
        } else if (res === 'emailUsed') {
          this.message.error('The email is already been used.');
        } else {
          this.message.success('Record added successfully');
          setTimeout(() => {
            this.isVisible = false;
            this.isConfirmLoading = false;
          }, 3000);
          this.loadData();
        }
      });
    }
  }

  edit(data: any) {
    this.isVisible = true;
    this.isEdit = true;
    this.addNewForm.patchValue(data);
    this.currId = data.documentId;
  }

  delete(id: string) {
    this.donorService.deleteDonor(id).subscribe((res: any) => {
      if (res != null) {
        this.message.success('Donor account deleted.');
        this.loadData();
      }
    });
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.addNewForm.reset();
    this.isVisible = false;
    this.isEdit = false;
  }

  formatTimestamp(timestamp: any): string {
    if (timestamp == null) {
      return '-';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
}
