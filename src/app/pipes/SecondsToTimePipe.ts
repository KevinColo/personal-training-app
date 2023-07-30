import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'secondsToTime'})
export class SecondsToTimePipe implements PipeTransform {
  transform(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  }
}
