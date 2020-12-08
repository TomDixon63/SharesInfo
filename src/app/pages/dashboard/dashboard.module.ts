import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'theme';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [
    
  ],
})
export class DashboardModule { }
