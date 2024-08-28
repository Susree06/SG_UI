import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterBotComponent } from './currency-converter-bot.component';

describe('CurrencyConverterBotComponent', () => {
  let component: CurrencyConverterBotComponent;
  let fixture: ComponentFixture<CurrencyConverterBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConverterBotComponent]
    });
    fixture = TestBed.createComponent(CurrencyConverterBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
