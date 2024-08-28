import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConversionRateService } from 'src/app/core/services/conversionrate.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  currencies: any[] = [];
  selectedFromCurrency = 'Indian Rupees(INR)';
  selectedToCurrency = 'United States Dollar(USD)';
  fromAmount = 0;
  toAmount = 0;
  constructor(
    public dialogRef: MatDialogRef<CurrencyConverterComponent>,
    private conversionRateService: ConversionRateService
  ) {}
  ngOnInit(): void {
    this.getCurrencyConversionRates();
    this.dialogRef.updatePosition({ bottom: `100px`, right: `40px` });
  }
  getCurrencyConversionRates() {
    this.conversionRateService.getConversionRate().subscribe({
      next: (res) => {
        this.currencies = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  convertFromCurrency() {
    this.convertToAmount();
  }

  convertToCurrency() {
    this.convertFromAmount();
  }

  convertFromAmount() {
    const fromCurrency = this.currencies.find(
      (currency) => currency.currency === this.selectedFromCurrency
    );
    const toCurrency = this.currencies.find(
      (currency) => currency.currency === this.selectedToCurrency
    );
    const amountInUSD = this.fromAmount * fromCurrency.rate;
    const finalAmount = amountInUSD / toCurrency.rate;
    this.toAmount = Number(finalAmount.toFixed(2));
  }

  convertToAmount() {
    const fromCurrency = this.currencies.find(
      (currency) => currency.currency === this.selectedFromCurrency
    );
    const toCurrency = this.currencies.find(
      (currency) => currency.currency === this.selectedToCurrency
    );
    const amountInUSD = this.toAmount * toCurrency.rate;
    const finalAmount = amountInUSD / fromCurrency.rate;
    this.fromAmount = Number(finalAmount.toFixed(2));
  }
}