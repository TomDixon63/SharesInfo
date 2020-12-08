
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutsModule } from './layouts';
import { CommonLayoutComponent } from './layouts/common-layout';
import { DashboardComponent } from './pages/dashboard';
import { SearchComponent } from './pages/search/search.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
        { path: 'app', component: CommonLayoutComponent, children: [
          { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
          { path: 'search', component: SearchComponent, pathMatch: 'full' },
          { path: 'watchlist', component: WatchlistComponent, pathMatch: 'full' },
          { path: '**', redirectTo: '/ypages/404' },
        ] }, // add 'canActivate: AuthGuard' for catching unauth users
        { path: '**', redirectTo: '/pages/404' },
      ],
      { useHash: true },
    ),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
