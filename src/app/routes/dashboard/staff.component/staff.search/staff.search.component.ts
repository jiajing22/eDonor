import { Component, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';

import { Donor } from '../../../../shared/model/donor.model';
import { DonorService } from '../../../../shared/services/donor.service';
import { StaffService } from '../../../../shared/services/staff.service';
import {History} from "../../../../shared/model/history.model";
import {HistoryService} from "../../../../shared/services/history.service";

@Component({
  selector: 'app-staff-search',
  templateUrl: './staff.search.component.html',
  styleUrls: ['./staff.search.component.css']
})
export class StaffSearchComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private donorService: DonorService,
    private message: NzMessageService,
    private historyService: HistoryService,
  ) {}

  id: string = '';
  donorResult: Donor[] = [];
  donorList: Donor[] = [];
  isLoading = false;
  selectedData: any;
  isVisible = false;
  isUpdate = false;
  isUpdateLoading = false;
  isShowRecord = false
  donorTypes = ['New Donor', 'Regular/Repeat Donor', 'Lapsed Donor', 'Autologous Donor'];
  type='';
  currId = '';
  record: History[]=[];

  onSearchInputChange(): void {
    if (this.id === '') {
      this.donorResult = []; // Clear the search results
    }
  }

  search(): void {
    if (this.id === '') {
      this.message.info('Please enter Donor IC');
    } else {
      this.staffService
        .searchDonor(this.id)
        .pipe(
          catchError(err => {
            this.message.error(err.error);
            return throwError(err);
          })
        )
        .subscribe((res: any) => {
          if (res instanceof Array) {
            this.donorResult = res;
          } else {
            this.donorResult = [res];
          }
        });
    }
  }

  ngOnInit(): void {
    this.authenticate();
    this.loadData();
  }

  authenticate(){
    let userType = sessionStorage.getItem('userType');
    if (userType !== 'Staff') {
      this.message.error("Unauthorized Access!");
      this.router.navigateByUrl('/dashboard/landing');
      return;
    }
  }

  loadData(){
    this.isLoading = true;
    this.donorService.getDonor().subscribe((res: any) => {
      this.donorList = res;
      this.isLoading = false;
    });
  }

  getFormFields() {
    return [
      { label: 'Full Name', value: this.selectedData.fullName || '-' },
      { label: 'IC', value: this.selectedData.userId || '-' },
      { label: 'Gender', value: this.selectedData.gender || '-' },
      { label: 'Address', value: this.selectedData.address || '-' },
      { label: 'Blood Type', value: this.selectedData.bloodType || '-' },
      { label: 'Donation Times', value: this.selectedData.donationTimes || '-' },
      { label: 'Email', value: this.selectedData.email || '-' },
      { label: 'Phone', value: this.selectedData.phone || '-' },
      { label: 'Donor Type', value: this.selectedData.donorType || '-' }
    ];
  }

  handleOk() {
    this.isVisible = false;
  }

  showInfo(data: any) {
    this.isVisible = true;
    this.selectedData = { ...data };
  }

  showUpdate(data: any) {
    this.isUpdate = true;
    this.type=data.donorType;
    this.currId = data.donorId;
  }

  update() {
    let data = {
      donorId: this.currId,
      donorType: this.type
    }
    this.isUpdateLoading = true;
    this.donorService.updateDonorType(data)
      .subscribe((res:any)=>{
        if(res==null){
          this.message.error('Update Failed!');
          this.isUpdateLoading = false;
          this.isUpdate = false;
        } else {
          this.message.success('Update Successfully!');
          this.isUpdateLoading = false;
          this.isUpdate = false;
          this.loadData();
        }
      });
  }

  displayRecord(userId:string){
    this.isShowRecord = true;
    this.historyService.getRecord(userId)
      .subscribe((res:any)=>{
        if (res !== null){
          this.record = res;
        } else {
          this.record = [];
        }
      });
  }

  cancel() {
    this.isUpdate = false;
  }

  close(){
    this.isShowRecord = false;
  }
}
