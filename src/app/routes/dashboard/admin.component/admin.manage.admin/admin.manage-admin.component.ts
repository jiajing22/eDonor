import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {AdminService} from "../../../../shared/services/admin.service";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.manage-admin.component.html',
  styles: [`
    .action-btn{
      display: flex;
    }
    `
  ]
})
export class AdminManageAdminComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  loading  :boolean= false;
  isVisible = false;
  isEdit = false;
  isUpdateLoading = false;
  isConfirmLoading = false;
  list :any[]=[];
  passwordVisible = false;
  password?: string;
  currId: string = "";

  ngOnInit(): void {
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Admin') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
    }

    this.loading = true;
    this.loadData();
    this.addNewForm.get('fullName')?.valueChanges.subscribe((value: string) => {
      if (value) {
        this.addNewForm.get('fullName')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  loadData(){
    this.adminService.getAdminList().subscribe((res: any) => {
      this.list = res;
      this.loading = false;
    });
  }

  addNewForm = this.fb.nonNullable.group(
    {
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required ,Validators.email]],
    }
  );

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
      let postData = {... this.addNewForm.value, documentId: this.currId};
      this.adminService.updateAdmin(postData)
        .subscribe((res: any) => {
          if( res!= null){
            this.message.success("Record updated successfully");
            setTimeout(() => {
              this.isVisible = false;
              this.isUpdateLoading = false;
              this.isEdit = false;
            }, 2000);
            this.loadData();
          }
      });
    } else {
      this.isConfirmLoading = true;
      let postData = {... this.addNewForm.value};
      this.adminService.addAdmin(postData)
        .subscribe((res: any) => {
          if(res!=null){
            this.message.success("Record added successfully");
            setTimeout(() => {
              this.isVisible = false;
              this.isConfirmLoading = false;
            }, 2000);
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

  delete(id:string){
    this.adminService.deleteAdmin(id)
      .subscribe((res:any)=>{
        if(res!=null){
          this.message.success('Record deleted successfully');
          this.loadData();
        }
      });
  }

  showModal(){
    this.isVisible = true;
  }

  handleCancel(): void {
    this.addNewForm.reset();
    this.isVisible = false;
    this.isEdit = false;
  }

  formatTimestamp(timestamp: any): string {
    if (timestamp == null){
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
