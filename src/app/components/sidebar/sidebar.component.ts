import { Component, Input } from '@angular/core';

import { SidebarComponent as BaseSidebarComponent } from 'theme/components/sidebar';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['../../../theme/components/sidebar/sidebar.component.scss', './sidebar.component.scss'],
  templateUrl: '../../../theme/components/sidebar/sidebar.component.html',
})
export class SidebarComponent extends BaseSidebarComponent {
  public title = 'shares info';
  public menu = [
    { name: 'Dashboard', link: '/app/dashboard', icon: 'dashboard' },
    { name: 'Search', link: '/app/search', icon: 'search' },
    { name: 'Compare', link: '/app/compare', icon: 'list' },
   // { name: 'TestPage', link: '/app/test', icon: 'list' },
  ];
}
