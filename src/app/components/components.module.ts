import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChartComponent],
   
})
export class ComponentsModule {}
