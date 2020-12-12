import { Component, HostBinding } from '@angular/core';
import { UpgradableComponent } from 'theme/components/upgradable';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  //styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent extends UpgradableComponent {
  @HostBinding('class.mdl-grid') public readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') public readonly mdlGridNoSpacing = true;
}
