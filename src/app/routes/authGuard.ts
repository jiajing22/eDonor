import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  private expirationTimer: any;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next:ActivatedRouteSnapshot,
    state:  RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then(
      (authenticated) => {
        if(authenticated){
          this.checkExpiration();
          return true;
        }
        else{
          this.router.navigate(['/dashboard/login']);
          return false;
        }
      }
    );
  }

  private checkExpiration(): void {
    const currentTime = new Date().getTime();
    if (currentTime >= this.authService.getExpired()) {
      this.authService.logout();
      this.router.navigate(['/dashboard/login']);
    } else {
      // Continue checking for expiration
      const checkInterval = 1000; // Adjust the interval as needed
      this.expirationTimer = setTimeout(() => {
        this.checkExpiration();
      }, checkInterval);
    }
  }
}
