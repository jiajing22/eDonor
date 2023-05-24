import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/eDonor/history';

  getRecord(donorIc: any) {
    return this.http.get(this.baseUrl+"/donation/"+ donorIc);
  }

}
