import { Component,OnInit } from '@angular/core';
import {LoaderService} from '../../core/services/loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{
  isLoading: boolean = false;
  constructor(public loaderService: LoaderService) {}
  ngOnInit() {
    this.loaderService.loaderState.subscribe((state: boolean) => {
      setTimeout(() => {
        this.isLoading = state; 
      });
    });
  }
}
