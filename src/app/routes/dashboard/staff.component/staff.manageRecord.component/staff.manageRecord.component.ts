import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RecordService } from '../../../../shared/services/record.service';

@Component({
  selector: 'app-staff-manage-record-component',
  templateUrl: './staff.manageRecord.component.html'
  // styleUrls: ['./staff.manageApp.component.css']
})
export class StaffManageRecordComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private recordService: RecordService,
    private message: NzMessageService,
    private router: Router
  ) {}

  monthSelected: string = '';
  isLoading = false;
  searchResult: any[] = [];
  initLoad = false;
  record: any[] = [];

  months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  monthOptions = this.months.map(month => ({ value: month, label: month }));

  ngOnInit() {
    this.initLoad = true;
    this.recordService.getAllRecord().subscribe((res: any) => {
      this.record = res;
      this.initLoad = false;
    });
  }

  searchByMonth() {
    if (this.monthSelected === 'All') {
      this.searchResult = []; // or this.searchResult = [];
      return;
    }
    if (this.monthSelected) {
      const currentYear = new Date().getFullYear();
      const selectedMonth = this.monthSelected.toLowerCase();

      this.searchResult = this.record.filter((record: any) => {
        const regDate = new Date(record.regDate);
        const recordMonth = regDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
        const recordYear = regDate.getFullYear();

        return recordMonth === selectedMonth && recordYear === currentYear;
      });

      if (this.searchResult.length == 0) {
        this.message.info('No data yet!');
      }
    }
  }

  navigate(data: any) {
    console.log(data);
    const navigationExtras: NavigationExtras = {
      state: {
        first: data,
        second: data,
        third: data,
        isEdit: true,
        id: data.documentId
      }
    };

    this.router.navigate(['/staff/main/recordForm'], navigationExtras);
  }
}
