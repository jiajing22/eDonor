import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Bdcentre } from '../model/bdcentre.model';

@Injectable({
  providedIn: 'root'
})
export class BdcentreService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/bdcentre';

  getAllCentre() {
    return this.http.get(this.baseUrl);
  }

  addNew(postData: any) {
    return this.http.post(this.baseUrl, postData);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getItem(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateItem(id: string, postData: any) {
    return this.http.put(`${this.baseUrl}/${id}`, postData, { responseType: 'text' });
  }
}
