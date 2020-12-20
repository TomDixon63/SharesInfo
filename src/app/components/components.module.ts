import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from "./search-form/search-form.component";
import { LineChart2Component } from './line-chart-2/line-chart2.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LineChart2Component, ChartComponent],
   
})
export class ComponentsModule {}
