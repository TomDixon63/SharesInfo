
import { Pipe, PipeTransform } from '@angular/core';
import { ShareDetails } from '../model/share-details';

@Pipe({
    
    name: 'selectedShare'
})
export class SelectedSharePipe implements PipeTransform {
    transform(allShares:ShareDetails[], symbol:string): any {
        return allShares.filter(s => s.symbol === symbol);
    }
}