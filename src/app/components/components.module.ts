import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChartComponent, AlertComponent],
   
})
export class ComponentsModule {}
