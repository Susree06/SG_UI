import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    standalone: true,
    name: 'accountName'
  })
  export class AccountNamePipe implements PipeTransform {

    transform(accountName: string) {
      let name = accountName.split("|");
      return name[0];
    }
  }