import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    // console.log(value);
    return  value?.split("G")[0]
  }

}
