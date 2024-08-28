import { Component } from '@angular/core';
import { CurrencyConverterComponent } from '../currency-converter/currency-converter.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-converter-bot',
  templateUrl: './currency-converter-bot.component.html',
  styleUrls: ['./currency-converter-bot.component.scss'],
})
export class CurrencyConverterBotComponent {
  clickSound = new Audio();
  constructor(public dialog: MatDialog) {
    this.clickSound.src = 'assets/audio/currencybot.wav';
  }
  isPopupOpen: boolean = false;
  togglePopup() {
    this.clickSound.play();
    const dialogRef = this.dialog.open(CurrencyConverterComponent, {
      width: '520px',
      height: '255px',
      panelClass: 'customDialogClass',
      data: {
        /* You can pass data to the dialog if needed , you can pass the dropdown data  */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
