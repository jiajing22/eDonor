import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Donor } from '../model/donor.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/staff';

  validateStaffLogin(postData: any) {
    return this.http.post(`${this.baseUrl}/login`, postData);
  }

  searchDonor(id: string) {
    return this.http.get(`${this.baseUrl}/search-donor?id=${id}`);
  }

  getStaffInfo(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
