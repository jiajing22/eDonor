import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import {messageConstant} from "../../../../shared/utils/constant";
import {DonorService} from "../../../../shared/services/donor.service";
import {AppointmentService} from "../../../../shared/services/appointment.service";
import {Appointment} from "../../../../shared/model/appointment.model";
import {BdcentreService} from "../../../../shared/services/bdcentre.service";

@Component({
  selector: 'app-donor-main-page-component',
  templateUrl: './donor.mainpage.html',
  styleUrls : ['./donor.mainpage.css'],
})
export class DonorMainpage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private donorService: DonorService,
    private appointmentService: AppointmentService,
    private bdcentreService: BdcentreService,
  ) {}

  loading= false;
  userName: string ='';
  decryptedId='';
  donation = 0;
  bloodGroup = '';
  list: Appointment | undefined;
  noApp= false;

  ngOnInit(): void {
    this.loading=true;
    let sessionItem = sessionStorage.getItem('userId');
    if (sessionItem) {
      let item = CryptoJS.AES.decrypt(sessionItem, messageConstant.sKey);
      let decrypted = item.toString(CryptoJS.enc.Utf8);
      this.decryptedId = decrypted;
    }

    this.donorService.getDonorInfo(this.decryptedId)
      .subscribe((res: any) => {
        this.userName = res.fullName;
        this.donation = res.donationTimes;
        let postData = {
          donorId : res.userId
        }
        this.loadEvent(postData);
        this.loading=false;
      });

    this.bdcentreService.getBloodGroup('BG00001')
      .subscribe((res:any)=>{
        this.bloodGroup = res.needed;
      });
  }

  loadEvent(data:any){
    this.appointmentService.getAppointmentByUser(data)
      .subscribe((res: any) => {
        if(res === null){
          this.noApp = true;
          return;
        }
        const parsedData = res.map((item:any) => {
          const date = new Date(item.appmntDate);
          return { ...item, appmntDate: date };
        });
        // Get the current date
        const currentDate = new Date();
        // Calculate the difference between the current date and each 'appmntDate'
        const acceptedTodayData = parsedData.find((item: any) => {
          const appointmentDate = new Date(item.appmntDate);
          const isSameDay = appointmentDate.getDate() === currentDate.getDate();
          const isSameMonth = appointmentDate.getMonth() === currentDate.getMonth();
          const isSameYear = appointmentDate.getFullYear() === currentDate.getFullYear();

          return isSameDay && isSameMonth && isSameYear && item.aStatus === 'Accepted';
        });

        if (acceptedTodayData) {
          // Use the data with date = today's date && status === 'Accepted'
          this.list = acceptedTodayData;
        } else {
          // Filter the data to get the most current appointment data
          const filteredData = parsedData.filter((item:any) => item.aStatus === 'Accepted' && item.appmntDate >= currentDate);

          // Sort the filtered data by date in descending order
          filteredData.sort((a:any, b:any) => b.appmntDate.getTime() - a.appmntDate.getTime());

          // Retrieve the most current appointment data
          this.list = filteredData[0];
        }

        if(this.list === undefined){
          this.noApp = true;
        }
    });
  }

  translateDate(date: Date|undefined): string|undefined {
    if (date) {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      return formattedDate;
    }
    return '';
  }
}
