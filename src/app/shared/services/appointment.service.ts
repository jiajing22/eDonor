import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/eDonor/appointment';

  addAppointment(postData: any) {
    return this.http.post(this.baseUrl, postData, { responseType: 'text' });
  }

  getAppointmentByUser(postData:any){
    return this.http.post(this.baseUrl + '-list', postData);
  }

}
