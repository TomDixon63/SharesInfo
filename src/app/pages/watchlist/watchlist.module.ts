import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'theme';
import { WatchlistComponent } from './watchlist.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    WatchlistComponent,
  ],
  exports: [
    
  ],
})
export class WatchlistModule { }
