import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private http: HttpClient) {}

  // baseUrl = 'https://backendproduction.up.railway.app/eDonor/staff';
  baseUrl = 'http://localhost:8080/eDonor/staff';

  validateStaffLogin(postData: any) {
    return this.http.post(`${this.baseUrl}/login`, postData);
  }

  searchDonor(id: string) {
    return this.http.get(`${this.baseUrl}/search-donor?id=${id}`);
  }

  getStaffInfo(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllStaff() {
    return this.http.get(this.baseUrl);
  }

  updateStaffInfo(postData:any){
    return this.http.post(`${this.baseUrl}-update`, postData, {responseType:"text"})
  }

  changePassword(postData:any){
    return this.http.post(`${this.baseUrl}-update-credential`, postData, {responseType:"text"})
  }

  deleteStaff(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addNewStaff(post: any) {
    return this.http.post(this.baseUrl, post, { responseType: 'text' });
  }
}
