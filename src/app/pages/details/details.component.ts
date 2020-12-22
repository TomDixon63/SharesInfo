import { Component, HostBinding, OnInit } from "@angular/core";
import { UpgradableComponent } from "theme/components/upgradable";
import { ActivatedRoute } from "@angular/router";
import { Company } from "./../../model/company";
import { ShareDetails } from "./../../model/share-details";
import { AlphavantageService } from "./../../services/alphavantage/alphavantage.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
})
export class DetailsComponent extends UpgradableComponent implements OnInit {
  //SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  jsonData: any;

  // symbol from request parameter (example: GOOGL)
  symbol: string = "";

  //share details
  public shareDetails = new ShareDetails();

  //company information
  public company = new Company();

  constructor(
    private alphavantageService: AlphavantageService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super();
  }

  // get share symbol from url, get share details and company info from service
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.symbol) {
        this.symbol = params.symbol;
        this.getShareDetails();
        this.getCompanyInfo();
      } else {
        // TODO: change to ui message
        console.log("no symbol!");
      }
    });
  }

  // TODO: create json mapper service, json2ShareDetails
  // share details
  private getShareDetails() {
    this.alphavantageService.getShareDetails(this.symbol).subscribe((data) => {
      this.shareDetails.symbol = data["Global Quote"]["01. symbol"];
      this.shareDetails.open = data["Global Quote"]["02. open"];
      this.shareDetails.high = data["Global Quote"]["03. high"];
      this.shareDetails.low = data["Global Quote"]["04. low"];
      this.shareDetails.price = data["Global Quote"]["05. price"];
      this.shareDetails.volume = data["Global Quote"]["06. volume"];
      this.shareDetails.latestTradingDay =
        data["Global Quote"]["07. latest trading day"];
      this.shareDetails.previousClose =
        data["Global Quote"]["08. previous close"];
      this.shareDetails.change = data["Global Quote"]["09. change"];
      this.shareDetails.changePercent =
        data["Global Quote"]["10. change percent"];
    });
  }

  // TODO: create json mapper service, json2CompanyInfo
  //company info
  private getCompanyInfo() {
    this.alphavantageService.getCompanyInfo(this.symbol).subscribe((data) => {
      this.company.name = data["Name"];
      this.company.description = data["Description"];
      this.company.exchange = data["Exchange"];
      this.company.currency = data["Currency"];
      this.company.country = data["Country"];
      this.company.sector = data["Sector"];
      this.company.address = data["Address"];
      this.company.yearHigh = data["52WeekHigh"];
      this.company.yearLow = data["52WeekLow"];
      this.company.dividendDate = data["DividendDate"];
      this.company.dividendPerShare = data["DividendPerShare"];
      this.company.dividendYield = data["DividendYield"];
    });
  }

  // navigate back
  public navigateBack() {
    this.location.back();
  }
}
