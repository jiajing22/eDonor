import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;
  private loggedIn:boolean = false;
  time: number = 0;

  constructor() { }

  getExpired(): number{
    const authData = JSON.parse(sessionStorage.getItem('token')?? '');
    if (authData) {
      this.time = authData.expiresAt;
    }
    return this.time;
  }

  logout(): void {
    // Perform logout logic, e.g., clearing session data, invalidating the authToken, etc.
    // Remove the authToken from sessionStorage or any other storage mechanism
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('token');
    this.authToken = null;
  }

  isAuthenticated() {
    const premise = new Promise((resolve, reject) => {
      if (sessionStorage.getItem('token') != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      resolve(this.loggedIn);
    });
    return premise;
  }

  resetExpirationTime(): void {
    let item = sessionStorage.getItem('token');
    if( item != null){
      const expirationMinutes = 10; // Adjust the expiration time as needed
      const expirationTime = new Date().getTime() + expirationMinutes * 60000;
      this.time = expirationTime;
      const authData = JSON.parse(sessionStorage.getItem('token')?? '');
      if (authData) {
        authData.expiresAt = expirationTime;
        sessionStorage.setItem('token', JSON.stringify(authData));
      }
    }
  }

  generateAuthToken(): string {
    // Generate a new random token using a suitable algorithm
    const authTokenLength = 20; // Adjust the length as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < authTokenLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  setAuthTokenInSessionStorage(token: string): void {
    const expirationMinutes = 15; // Adjust the expiration time as needed
    const expirationTime = new Date().getTime() + expirationMinutes * 60000;
    this.time = expirationTime;
    const authData = {
      token: token,
      expiresAt: expirationTime,
    };
    sessionStorage.setItem('token', JSON.stringify(authData));
  }
}
