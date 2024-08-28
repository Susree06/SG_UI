import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-guidance-landing-page',
  templateUrl: './sales-guidance-landing-page.component.html',
  styleUrls: ['./sales-guidance-landing-page.component.scss']
})
export class SalesGuidanceLandingPageComponent implements OnInit,AfterViewInit {
  loggedInUser : any;
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loggedInUser=sessionStorage.getItem("username")
    }, 2000);
  }
}
