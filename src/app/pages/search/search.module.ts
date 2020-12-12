import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'theme';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    SearchComponent,
  ],
  exports: [
    
  ],
})
export class SearchModule { }
