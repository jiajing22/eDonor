import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/eDonor/registration';

  addRecord(postData: any) {
    return this.http.post(this.baseUrl, postData, {responseType: "text"});
  }

}
