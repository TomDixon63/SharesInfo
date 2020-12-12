// service class, contains all methods which connect to alpha vantage

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlphavantageService {

  //todo replace with key from login
  private API_KEY = "M889HPMD6E6FF5OQ";
  private ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query";
 
  //search suggestions by keyword(s), example: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=IBM&apikey=demo
  private SEARCH_SUGGESTIONS_URL = this.ALPHA_VANTAGE_URL + "?function=SYMBOL_SEARCH";

  //search share details by symbol, example: https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
  private SEARCH_DETAILS_URL = this.ALPHA_VANTAGE_URL + "?function=GLOBAL_QUOTE";

  //search intraday data by symbol, example: https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo
  private INTRADAY_URL = this.ALPHA_VANTAGE_URL + "?function=TIME_SERIES_INTRADAY";

  //time interval for intraday search
  private INTRADAY_INTERVAL = "5min";

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
}
