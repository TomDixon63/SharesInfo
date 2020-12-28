// service class, contains all methods which connect to alpha vantage

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AlphavantageService {
  // TODO: replace with key from login
  private API_KEY = "M889HPMD6E6FF5OQ";
  private ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query";

  //search suggestions by keyword(s), example: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=IBM&apikey=demo
  private SEARCH_SUGGESTIONS_URL =
    this.ALPHA_VANTAGE_URL + "?function=SYMBOL_SEARCH";

  //search share details by symbol, example: https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
  private SEARCH_DETAILS_URL =
    this.ALPHA_VANTAGE_URL + "?function=GLOBAL_QUOTE";

  //search intraday data by symbol, example: https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo
  private INTRADAY_URL =
    this.ALPHA_VANTAGE_URL + "?function=TIME_SERIES_INTRADAY";

  //search weekly by symbol, example: https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo
  private WEEKLY_URL =
    this.ALPHA_VANTAGE_URL + "?function=TIME_SERIES_WEEKLY";  

  //search monthly by symbol, example:  https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo  
  private MONTHLY_URL = 
  this.ALPHA_VANTAGE_URL + "?function=TIME_SERIES_MONTHLY";

  //time interval for intraday search, alpha does not support > 5min when free api key
  private INTRADAY_INTERVAL = "5min";

  //company data, example: https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
  private COMPANY_URL = this.ALPHA_VANTAGE_URL + "?function=OVERVIEW";


  constructor(private http: HttpClient) {}

  //share suggestions by keyword(s)
  public getShareSuggestions(keywords: string): Observable<any> {
    const url = `${this.SEARCH_SUGGESTIONS_URL}&keywords=${keywords}&apikey=${this.API_KEY}`;
    console.log(url);
    return this.http.get(url);
  }

  //share details by symbol
  public getShareDetails(symbol: string): Observable<any> {
    const url = `${this.SEARCH_DETAILS_URL}&symbol=${symbol}&apikey=${this.API_KEY}`;
    console.log(url);
    return this.http.get(url);
  }

  //share intraday data by symbol
  public getShareIntraDayData(symbol): Observable<any> {
    const url = `${this.INTRADAY_URL}&symbol=${symbol}&interval=${this.INTRADAY_INTERVAL}&apikey=${this.API_KEY}`;
    console.log(url);
    return this.http.get(url);
  }

  //share weekly data by symbol
  public getShareWeeklyData(symbol): Observable<any> {
    const url = `${this.WEEKLY_URL}&symbol=${symbol}&interval=${this.INTRADAY_INTERVAL}&apikey=${this.API_KEY}`;
    console.log(url);
    return this.http.get(url);
  }

  //share monthly data by symbol
  public getShareMonthlyData(symbol): Observable<any> {
    const url = `${this.MONTHLY_URL}&symbol=${symbol}&apikey=${this.API_KEY}`;;
    console.log(url);
    return this.http.get(url);
    /* error handling, see angular tutorial
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
    */
  }

  //company information
  public getCompanyInfo(symbol): Observable<any> {
    const url = `${this.COMPANY_URL}&symbol=${symbol}&apikey=${this.API_KEY}`;
    console.log(url);
    return this.http.get(url);
  }

  //error handling, see angular tutorial
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
