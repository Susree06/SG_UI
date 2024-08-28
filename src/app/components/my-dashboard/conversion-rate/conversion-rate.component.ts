import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscriber } from 'rxjs';
import { ConversionRateService } from 'src/app/core/services/conversionrate.service';
import { ConversionRatePopComponent } from '../conversion-rate-pop/conversion-rate-pop.component';
import { ConversionRateHistoryPopUpComponent } from '../conversion-rate-history-pop-up/conversion-rate-history-pop-up.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-conversion-rate',
  templateUrl: './conversion-rate.component.html',
  styleUrls: ['./conversion-rate.component.scss'],
})
export class ConversionRateComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['Currency', 'ToUSD($)', 'Action', 'History'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  currentFilter: any = '';
  constructor(
    public dialogRef: MatDialog,
    public conversionRateService: ConversionRateService
  ) {}
  ngOnInit(): void {
    this.getConversionRate();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.currency) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(
          (term) =>
            data.currency.toLowerCase().includes(term)       
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getConversionRate() {
    this.conversionRateService.getConversionRate().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Element>(data);
      this.dataSource.paginator = this.paginator;
      this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
    });
  }

  addNew(element) {
    const newAccountDialog = this.dialogRef.open(ConversionRatePopComponent, {
      width: '800px',
      height: '270px',
      data: {
        ConversionRate: element,
        isReadOnly: true,
      },
    });
    this.currentFilter = this.dataSource.filter;
    newAccountDialog.afterClosed().subscribe((result) => {
      this.getConversionRate();
    });
  }

  addNewCurrency() {
    const newAccountCurrencyDialog = this.dialogRef.open(
      ConversionRatePopComponent,
      {
        width: '800px',
        height: '270px',
        data: {
          isReadOnly: false,
        },
      }
    );
    this.currentFilter = this.dataSource.filter;
    newAccountCurrencyDialog.afterClosed().subscribe((result) => {
      this.getConversionRate();
    });
  }
  viewCurrencyHistory(element) {
    const newCurrencyHistoryDialog = this.dialogRef.open(
      ConversionRateHistoryPopUpComponent,
      {
        width: '800px',
        minHeight: '300px',
        data: {
          ConversionRate: element.histories,
        },
      }
    );
    newCurrencyHistoryDialog.afterClosed().subscribe((result) => {});
  }
}
