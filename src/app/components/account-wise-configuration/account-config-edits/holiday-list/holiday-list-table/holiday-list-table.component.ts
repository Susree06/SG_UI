import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HolidaysDetailsDto } from 'src/app/core/models/account-wise-configuration.model';
import { HolidaysService } from 'src/app/core/services/holidays-service';

@Component({
  selector: 'app-holiday-list-table',
  templateUrl: './holiday-list-table.component.html',
  styleUrls: ['./holiday-list-table.component.scss']
})
export class HolidayListTableComponent implements OnInit{

  @Input()locationId!: number;
  displayedColumns = ['Date','Holiday'];
  dataSource_Offshore = new MatTableDataSource<HolidaysDetailsDto>();
  dataSource_Onsite = new MatTableDataSource<HolidaysDetailsDto>();
  public HolidaysList!: HolidaysDetailsDto[];
  offshoreHolidayList!: HolidaysDetailsDto[];
  onsiteHolidayList!: HolidaysDetailsDto[];
  currentYear: string;
  constructor(private holidaysService: HolidaysService){
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this.holidaysService.getAllHolidays(this.currentYear).subscribe(data => {
      this.HolidaysList = data;

      this.offshoreHolidayList = this.HolidaysList?.filter(
        HolidaysList => HolidaysList.location === 'Offshore');

      this.onsiteHolidayList = this.HolidaysList?.filter(
          HolidaysList => HolidaysList.location === 'Onsite');
   });
  }

  checkDataSource(){
    if (this.locationId === 1){
      return new MatTableDataSource<HolidaysDetailsDto>(this.offshoreHolidayList);
    }
    return new MatTableDataSource<HolidaysDetailsDto>(this.onsiteHolidayList);
  }
}
