import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class SessionTimeoutService {
  private timeout: any

  constructor(public router: Router,private authService:MsalService,public dialog: MatDialog) {
    this.resetTimer();
    this.initListener()
   }

   resetTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.logout(), 900000);
  }

  initListener() {
    document.addEventListener('mousemove', () => this.resetTimer());
    document.addEventListener('keypress', () => this.resetTimer());
  }

  logout() {
    sessionStorage.clear()
    localStorage.clear();
    this.dialog.closeAll()
    this.router.navigate(['/login']);
  }
}
