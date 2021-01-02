import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { MessageMenuComponent } from 'app/components/message-menu';
import { NotificationMenuComponent } from 'app/components/notification-menu';
import { SidebarComponent } from 'app/components/sidebar';
import { ThemeModule } from 'theme';
import { BlankLayoutComponent } from './blank-layout';
import { CommonLayoutComponent } from './common-layout';
import { AlertComponent } from './../components/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    CommonLayoutComponent,
    BlankLayoutComponent,
    BlankLayoutCardComponent,
    SidebarComponent,
    MessageMenuComponent,
    NotificationMenuComponent,
    AlertComponent
  ],
  exports: [
    CommonLayoutComponent,
    BlankLayoutComponent,
  ],
})
export class LayoutsModule { }
