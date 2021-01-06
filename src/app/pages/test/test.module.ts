import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'theme';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
   TestComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule
  ]
})
export class TestModule { }
