import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Donor } from '../model/donor.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8080/eDonor/donor';
  basicUrl = 'http://localhost:8080/eDonor';

  validateDonorLogin(postData:any){
    return this.http.post(this.baseUrl+"/login", postData);
  }

  addDonor(donor: Donor) {
    console.log(donor);
    console.log(this.baseUrl);
    return this.http.post(this.baseUrl, donor);
  }
  getDonor() {
    return this.http.get(this.baseUrl);
  }

  register(postData:any){
    return this.http.post(this.baseUrl, postData);
  }

  getDonorInfo(id:string) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  updateInfo(postData: any){
    return this.http.put(this.baseUrl,postData);
  }

  changePw(postData: any){
    return this.http.post(this.basicUrl+"/update-password",postData)
  }

}
