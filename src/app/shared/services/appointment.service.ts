import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/appointment';
  // baseUrl = 'http://localhost:8080/eDonor/appointment';

  addAppointment(postData: any) {
    return this.http.post(`${this.baseUrl}`, postData, { responseType: 'text' });
  }

  getAppointmentByUser(postData: any) {
    return this.http.post(`${this.baseUrl}-list`, postData);
  }

  getAppointmentList() {
    return this.http.get(`${this.baseUrl}`);
  }

  updateAppStatus(postData: Appointment) {
    return this.http.put(`${this.baseUrl}`, postData, { responseType: 'text' });
  }
}
