import { Component } from '@angular/core';
import { Router, mapToCanActivate } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isUserLoggedIn:boolean=false;
  
  constructor(private router:Router){
  }
  hide = true;
  checked = false;
  password = new FormControl('', [Validators.required])

  ngOnInit(): void {
  }
  onSignIn()
  {
    //this.router.navigate(['/account-config']);
    this.router.navigate(['/landing-page'])
      return this.router.url ==='./landing-page'
  }
}