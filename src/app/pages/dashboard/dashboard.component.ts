import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { ShareDetails } from "./../../model/share-details";
import { AlphavantageService } from "app/services/alphavantage/alphavantage.service";
import { Component, HostBinding } from "@angular/core";
import { UpgradableComponent } from "theme/components/upgradable";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent extends UpgradableComponent {
  //SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  //dow jones top 10 by market cap, alpha does not provide more than 10 when free api key
  //private dowJonesSymbols = ["AAPL", "MSFT", "V", "WMT", "WMT", "JPM", "PG", "UNH", "DIS", "HD"];
  private dowJonesSymbols = ["AAPL", "MSFT"];

  //nasdaq 100 top 10 by market cap, alpha does not provide more than 10 when free api key
  /*
  private nasdaqSymbols = [
    "AAPL",
    "AMZN",
    "GOOG",
    "GOOGL",
    "FB",
    "ADBE",
    "CMCSA",
    "CSCO",
    "AVGO",
    " COST",
  ];
  */

  private nasdaqSymbols = [
    "AAPL",
    "AMZN",
  ];

  jsonData: any;

  //table headers for all 3 tables
  public headers = [
    "Symbol",
    "Open",
    "Price",
    "Previous Close",
    "Change",
    "Change perecent",
    "  ",
  ];

  //list with dow jones shares
  public dowJonesList: ShareDetails[] = [];

  //list with nasdaq shares
  public nasdaqList: ShareDetails[] = [];

  constructor(
    private alphavantageService: AlphavantageService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
   //this.getDowJones();
   //this.getNasdaq();
  }

  //TODO: refactor, one mapping method for dow jones and nasdaq
  //get dow jones shares
  private getDowJones(){
    for (const symbol of this.dowJonesSymbols) {
      let shareDetails = new ShareDetails();
      this.alphavantageService.getShareDetails(symbol).subscribe((data) => {
        shareDetails.symbol = data["Global Quote"]["01. symbol"];
        shareDetails.open = data["Global Quote"]["02. open"];
        shareDetails.high = data["Global Quote"]["03. high"];
        shareDetails.low = data["Global Quote"]["04. low"];
        shareDetails.price = data["Global Quote"]["05. price"];
        shareDetails.volume = data["Global Quote"]["06. volume"];
        shareDetails.latestTradingDay =
          data["Global Quote"]["07. latest trading day"];
        shareDetails.previousClose = data["Global Quote"]["08. previous close"];
        shareDetails.change = data["Global Quote"]["09. change"];
        shareDetails.changePercent = data["Global Quote"]["10. change percent"];
        this.dowJonesList.push(shareDetails);
      });
    }
  }

  //get nasdaq shares
  private getNasdaq(){
    for (const symbol of this.nasdaqSymbols) {
      let shareDetails = new ShareDetails();
      this.alphavantageService.getShareDetails(symbol).subscribe((data) => {
        shareDetails.symbol = data["Global Quote"]["01. symbol"];
        shareDetails.open = data["Global Quote"]["02. open"];
        shareDetails.high = data["Global Quote"]["03. high"];
        shareDetails.low = data["Global Quote"]["04. low"];
        shareDetails.price = data["Global Quote"]["05. price"];
        shareDetails.volume = data["Global Quote"]["06. volume"];
        shareDetails.latestTradingDay =
          data["Global Quote"]["07. latest trading day"];
        shareDetails.previousClose = data["Global Quote"]["08. previous close"];
        shareDetails.change = data["Global Quote"]["09. change"];
        shareDetails.changePercent = data["Global Quote"]["10. change percent"];
        this.nasdaqList.push(shareDetails);
      });
    }
  }

  //TODO: refactor, is copy of method in search.component.ts
  // navigate to details page
  public navigateToDetailsPage(symbol: string) {
    var url: string = "/app/details?symbol=" + symbol;
    this.router.navigateByUrl(url);
  }

  //TODO: refactor, is copy of method in search.component.ts
  // navigate back
  public navigateBack() {
    this.location.back();
  }
}
