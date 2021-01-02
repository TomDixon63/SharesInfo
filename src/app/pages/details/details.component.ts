import { AlertService } from "./../../components/alert/alert.service";
import { UtilService } from "./../../services/util/util.service";
import { DatabaseService } from "./../../services/database/database.service";
import { Component, HostBinding, OnInit } from "@angular/core";
import { UpgradableComponent } from "theme/components/upgradable";
import { ActivatedRoute } from "@angular/router";
import { Company } from "./../../model/company";
import { ShareDetails } from "./../../model/share-details";
import { AlphavantageService } from "./../../services/alphavantage/alphavantage.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
})
export class DetailsComponent extends UpgradableComponent implements OnInit {
  // SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  // alert options
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  // symbol from request parameter (example: GOOGL)
  symbol: string = "";

  // share details
  public shareDetails = new ShareDetails();

  // company information
  public company = new Company();

  constructor(
    private alphavantageService: AlphavantageService,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private alertService: AlertService,
    private utilService: UtilService,
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

  // share details
  // if  more > 5 requests/min, show alert with the alpha message
  private getShareDetails() {
    this.alphavantageService.getShareDetails(this.symbol).subscribe((data) => {
      const note: string = JSON.stringify(data);
      if (!note.includes("Note")) {
        this.shareDetails = this.utilService.globalQuote2ShareDetailsMapper(
          data
        );
      } else {
        this.alertService.warn(
          "Alpha Vantage says: " +
            note +
            " - SHARESINFO says: Keep calm and try again in a minute :-)"
        );
      }
    });
  }

  // TODO: create json mapper service, json2CompanyInfo
  // company info
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

  // add share to watchlist
  public addToWatchList() {
    this.databaseService.addToWatchList(this.shareDetails);
  }
}
