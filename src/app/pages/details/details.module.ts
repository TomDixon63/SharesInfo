import { ChartComponent } from './../../components/chart/chart.component';
import { DetailsComponent } from './details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    NgxChartsModule
  ],
  declarations: [
    DetailsComponent,
    ChartComponent
  ],
})
export class DetailsModule { }
