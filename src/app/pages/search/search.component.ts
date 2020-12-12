import { Component, HostBinding} from '@angular/core';
import { UpgradableComponent } from 'theme/components/upgradable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  //styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UpgradableComponent {
  @HostBinding('class.mdl-grid') public readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') public readonly mdlGridNoSpacing = true;

}
