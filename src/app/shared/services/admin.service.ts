import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/authorize/admin';

  validateAdminLogin(postData: any) {
    return this.http.post(this.baseUrl + "/login", postData);
  }

}
