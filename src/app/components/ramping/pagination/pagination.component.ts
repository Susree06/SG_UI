import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
  manageAccountForm!: FormGroup;
  accountId!: number;
  accTypes = [
    // {
    //   id: 1,
    //   name: 'Existing Existing',
    // },
    {
      id: 2,
      name: 'Existing New',
    },
    {
      id: 3,
      name: 'Net New',
    },
  ];
  constructor(private fb: FormBuilder, private router:Router){

  }

  ngOnInit(): void {
    this.accountId = 2;
    this.manageAccountForm = this.fb.group({
      accountTypes: [2]
    });
  }

  valueChanged(event: any){
    this.accountId = event;
  }

  salesGuidane(){
    this.router.navigate(['/sales-guidance'])
  }
}
