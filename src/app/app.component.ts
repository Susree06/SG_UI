import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { AzureAdDemoService } from './core/services/azure-ad-demo.service';
import { Router } from '@angular/router';
import { AccountService } from './core/services/account.service';
import { LoginService } from './core/services/login.service';
import { SessionTimeoutService } from './core/services/session-timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  isUserLoggedIn:boolean = false;
  isUserInfoLoaded: boolean = false;
  private readonly _destroy = new Subject<void>();
  title = 'Sales_Guidance_UI';
  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  public router: Router,
  private msalBs : MsalBroadcastService,
  private authService : MsalService,
  private azureAdDemoService: AzureAdDemoService,
  private loginService : LoginService,
  private sessionTimeoutService:SessionTimeoutService 
  ){

  }

  ngOnInit() :void
  {
    this.msalBs.inProgress$.pipe(filter((interactionStatus:InteractionStatus) =>
    interactionStatus==InteractionStatus.None), takeUntil(this._destroy))
    .subscribe( x=>
      {
        this.loginService.getUserDetails().subscribe(x => {
          this.isUserInfoLoaded = true;
          if(x != undefined) {
            sessionStorage.setItem("featureNames", JSON.stringify(x.featureNames));
            sessionStorage.setItem("isAdmin", x.rolenames.includes('Admin') || x.rolenames.includes('Executives'));
            sessionStorage.setItem("isBDM", x.rolenames.includes('BDM'));   
          } else {
            sessionStorage.setItem("featureNames", null);
            sessionStorage.setItem("isAdmin", "false");
            sessionStorage.setItem("isBDM", "false");
          }

        });
        this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0
        this.azureAdDemoService.isUserLoggedIn.next(this.isUserLoggedIn);
      })
      this.sessionTimeoutService.resetTimer();
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login()
  {
    if(this.msalGuardConfig.authRequest)
    {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    }
    else{
      this.authService.loginRedirect();

    }
  }

  logout()
  {
    this.router.navigate(['/login']);
    this.authService.logoutRedirect();
  }
}
