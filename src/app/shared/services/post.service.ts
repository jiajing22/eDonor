import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://backendproduction.up.railway.app/eDonor/campaign';
  // baseUrl = 'http://localhost:8080/eDonor/campaign';

  addPost(postData: any) {
    return this.http.post(`${this.baseUrl}`, postData, { responseType: 'text' });
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/get-all`);
  }

  updatePost(post: any) {
    return this.http.put(`${this.baseUrl}`, post, { responseType: 'text' });
  }
}
