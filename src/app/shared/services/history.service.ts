import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/history';

  getRecord(donorIc: any) {
    return this.http.get(`${this.baseUrl}/donation/${donorIc}`);
  }
}
