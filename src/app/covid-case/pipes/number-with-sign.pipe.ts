import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithSign'
})
export class NumberWithSignPipe implements PipeTransform {
  transform(value: number): string {
    const sign = value >= 0 ? '+' : '-';
    return `${sign}${Math.abs(value)}`;
  }
}
