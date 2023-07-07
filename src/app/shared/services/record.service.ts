import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/record';
  // baseUrl = 'http://localhost:8080/eDonor/record';

  addRecord(postData: any) {
    return this.http.post(this.baseUrl, postData);
  }

  getAllRecord() {
    return this.http.get(this.baseUrl);
  }

  updateRecord(post: any) {
    return this.http.put(this.baseUrl, post, { responseType: 'text' });
  }
}
