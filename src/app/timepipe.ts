import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timesplit' })
export class TimeSplitPipe implements PipeTransform {
    transform(intext:string):string {
        return intext.toString().split(" ")[4].substring(0,5);
    }
}