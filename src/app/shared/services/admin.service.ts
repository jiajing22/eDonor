import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/authorize/admin';

  validateAdminLogin(postData: any) {
    return this.http.post(`${this.baseUrl}/login`, postData);
  }

  getAdminById(postData: any) {
    return this.http.post(`${this.baseUrl}-get`, postData);
  }

  getAdminList() {
    return this.http.get(this.baseUrl);
  }

  updateAdmin(post: any) {
    return this.http.put(`${this.baseUrl}-update`, post, { responseType: 'text' });
  }

  addAdmin(post: any) {
    return this.http.post(this.baseUrl, post, { responseType: 'text' });
  }

  deleteAdmin(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
