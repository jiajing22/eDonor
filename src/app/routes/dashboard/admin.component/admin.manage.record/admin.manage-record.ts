import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {RecordService} from "../../../../shared/services/record.service";
import {NzMessageService} from "ng-zorro-antd/message";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.manage-record.html',
  styleUrls: ['./admin.manage-record.css']
})
export class AdminManageRecord implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private recordService: RecordService,
    private message: NzMessageService,
  ) {}

  monthSelected: string = '';
  isLoading = false;
  allRecord: any[] = [];
  searchResult: any[] = [];

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

  monthOptions = this.months.map(month => ({value: month, label: month}));

  ngOnInit(): void {
    this.isLoading = true;
    this.recordService.getAllRecord()
      .subscribe((res:any)=>{
        this.allRecord = res;
        this.isLoading = false;
      })
  }

  searchByMonth(){
    if(this.monthSelected === ''){
      this.message.info('Please select the month!');
    }
    if (this.monthSelected === 'All'){
      this.searchResult = []; // or this.searchResult = [];
      return;
    }
    if (this.monthSelected) {
      const currentYear = new Date().getFullYear();
      const selectedMonth = this.monthSelected.toLowerCase();

      this.searchResult = this.allRecord.filter((record: any) => {
        const regDate = new Date(record.regDate);
        const recordMonth = regDate.toLocaleString('en-US', {month: 'long'}).toLowerCase();
        const recordYear = regDate.getFullYear();

        return recordMonth === selectedMonth && recordYear === currentYear;
      });
      // Do something with the filtered records
    }
  }

  generatePDF(): void {
    let title = 'Blood Donation Record';
    if (this.monthSelected && this.monthSelected !== 'All') {
      title = this.monthSelected + ' Blood Donation Record';
    } else if (this.monthSelected === 'All'){
      this.message.error('Not supported yet!');
      return;
    } else {
      this.message.error('Please select the month');
      return;
    }

    if (this.searchResult === null){
      this.message.error('Please get the search result first!');
      return;
    }

    const totalCount = this.searchResult.length;
    const bloodGroupCounts = this.calculateGroupCounts(this.searchResult);
    const bloodCentreCounts = this.calculateCentreCounts(this.searchResult);

    const documentDefinition = {
      content: [
        { text: title, style: 'header' },
        { text: 'Total Records: ' + totalCount },
        {
          text: 'Blood Group Counts:',
          style: 'subheader'
        },
        {
          ul: bloodGroupCounts.map(count => `${count.bloodGroup}: ${count.count}`) // Display blood group counts
        },
        {
          text: 'Blood Centre Counts:',
          style: 'subheader'
        },
        {
          ul: bloodCentreCounts.map(count => `${count.bloodCentre}: ${count.count}`) // Display blood centre counts
        },
        {
          text: 'List of Records:',
          style: 'subheader'
        },
        {
          table: {
            headerRows: 1,
            body: [
              [
                { text: 'Donate Date', style: 'tableHeader' },
                { text: 'Blood Group', style: 'tableHeader' },
                { text: 'Volume(ml)', style: 'tableHeader' },
                { text: 'Donor IC', style: 'tableHeader' },
                { text: 'Blood Centre', style: 'tableHeader' },
              ],
              ...this.searchResult.map((record: any) =>
                [record.regDate, record.bloodGroup, record.volume, record.donorIc, record.bloodCentre]), // Table rows
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 16] // margin: [left, top, right, bottom]
        },
        tableHeader: {
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 8]
        }
      }
    };

    // Generate the PDF document
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('sample.pdf');
  }

  calculateGroupCounts(records: any[]): { bloodGroup: string, count: number }[] {
    const groupCounts: { [bloodGroup: string]: number } = {};
    records.forEach(record => {
      const bloodGroup = record.bloodGroup;
      if (groupCounts[bloodGroup]) {
        groupCounts[bloodGroup]++;
      } else {
        groupCounts[bloodGroup] = 1;
      }
    });

    // Convert the groupCounts object to an array of { bloodGroup, count } objects
    return Object.keys(groupCounts).map(bloodGroup => ({
      bloodGroup,
      count: groupCounts[bloodGroup]
    }));
  }

  calculateCentreCounts(records: any[]): { bloodCentre: string, count: number }[] {
    const centreCounts: { [bloodCentre: string]: number } = {}; // Type annotation added
    records.forEach(record => {
      const bloodCentre = record.bloodCentre;
      if (centreCounts[bloodCentre]) {
        centreCounts[bloodCentre]++;
      } else {
        centreCounts[bloodCentre] = 1;
      }
    });

    // Convert the centreCounts object to an array of { bloodCentre, count } objects
    return Object.keys(centreCounts).map(bloodCentre => ({
      bloodCentre,
      count: centreCounts[bloodCentre]
    }));
  }
}
