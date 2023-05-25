import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/eDonor/record';

  addRecord(postData: any) {
    return this.http.post(this.baseUrl, postData);
  }

}