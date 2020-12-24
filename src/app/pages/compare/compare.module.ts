import { FormsModule } from '@angular/forms';
import { ThemeModule } from './../../../theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareComponent } from './compare.component';

@NgModule({
  declarations: [
    CompareComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
  ]
})
export class CompareModule { }
