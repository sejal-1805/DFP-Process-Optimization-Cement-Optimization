import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removebrackets'
})
export class RemovebracketsPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\([^)]*\)/g,'').trim();
  }

}
