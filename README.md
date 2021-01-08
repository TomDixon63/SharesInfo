# SHARES INFO

Implements a simple UI build with Angular 9 to access realtime share quotes provided by [Alpha Vantage](https://www.alphavantage.co/).

It uses a free dark material theme by  [creativeit.io](http://material-angular-dashboard.creativeit.io/#/app/dashboard).

## Screenhots

#### Login

![login](/screenshots/login.png)

#### Dashboard 

![dashboard1](/screenshots/dashboard_without_watchlist_entries.png)

#### Search a share

![search](/screenshots/search.png)

#### Share details

![details](/screenshots/details.png)

#### Dashboard with watchlist

![dashboard2](/screenshots/dashboard_with_watchlist.png)



#### Compare shares performance

![compare](/screenshots/compare.png)

## Install and run

#### Prerequisites

1. Get a free api key from [Alpha Vantage](https://www.alphavantage.co/)
2. Install [Node.js](https://nodejs.org/en/)
3. Install Angular CLI with the command: **npm install -g @angular/cli**

#### Run
1. Checkout **Shares Info** from here (Button **Code** on top of this page)
2. Run typing **ng serve -o** in Angular CLI, the App will open in your Browser (http://localhost:4200) 
3. Type in the free api key in the login page

#### Remark
Alpha Vantage does not provide all data when using a free api key and only a few requests/min are allowed.
Therefore in some cases you will see a warning message from Alpha Vantage. Ignore, wait a minute and try again.
