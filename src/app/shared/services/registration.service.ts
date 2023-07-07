import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/registration';
  // baseUrl = 'http://localhost:8080/eDonor/registration';

  addRecord(postData: any) {
    return this.http.post(this.baseUrl, postData, { responseType: 'text' });
  }

  getFormList(id: string) {
    return this.http.get(`${this.baseUrl}-form/${id}`);
  }

  getAllFormList() {
    return this.http.get(`${this.baseUrl}-form`);
  }

  updateStatus(postData: any) {
    return this.http.post(`${this.baseUrl}-update`, postData, { responseType: 'text' });
  }
}
