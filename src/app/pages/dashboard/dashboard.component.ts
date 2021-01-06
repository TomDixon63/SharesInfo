import { AlertService } from "./../../components/alert/alert.service";
import { UtilService } from "./../../services/util/util.service";
import { DatabaseService } from "./../../services/database/database.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ShareDetails } from "./../../model/share-details";
import { AlphavantageService } from "app/services/alphavantage/alphavantage.service";
import { Component, HostBinding } from "@angular/core";
import { UpgradableComponent } from "theme/components/upgradable";
import { exit } from "process";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent extends UpgradableComponent {
  // SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  // alert options
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  // dow jones top 4 by market cap, alpha permits only a few requests/min when free api key
  private dowJonesSymbols = ["AAPL", "MSFT", "V", "WMT"];

  // table headers for all  tables
  public headers = ["Name / Symbol", "Price", "Change", "Change percent"];

  // list with dow jones shares
  public dowJonesList: ShareDetails[] = [];

  // watchlist
  public watchList: ShareDetails[] = [];

  constructor(
    private alphavantageService: AlphavantageService,
    private router: Router,
    private databaseService: DatabaseService,
    private utilService: UtilService,
    private alertService: AlertService,
    private location: Location
  ) {
    super();
  }

  // get dow jones shares from alpha on app start, after from database serrvice (actual only local storage)
  // add empty watchList to local storage on app start
  ngOnInit() {
    if (this.databaseService.getDowJonesList()) {
      this.dowJonesList = this.databaseService.getDowJonesList();
    } else {
      this.getDowJones();
    }
    if (this.databaseService.getWatchList()) {
      this.watchList = this.databaseService.getWatchList();
    } else {
      this.databaseService.setWatchList(this.watchList);
    }
  }

  // get dow jones shares and add them to local storage
  // if  more > 5 requests/min, show alert with the alpha message
  private getDowJones() {
    for (const symbol of this.dowJonesSymbols) {
      this.alphavantageService.getShareDetails(symbol).subscribe((data) => {
        const result: string = JSON.stringify(data);
        console.log(result);
        if (
          result.includes("Error") ||
          result.includes("Information") ||
          result.includes("Note")
        ) {
          this.alertService.warn(
            "Alpha Vantage says: " +
              result +
              " - SHARESINFO says: Keep calm and try again in a minute :-)"
          );
          
        } else {
          this.dowJonesList.push(
            this.utilService.globalQuote2ShareDetailsMapper(data)
          );
          this.databaseService.setDowJonesList(this.dowJonesList);
        }
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

  // add share to watchlist from dow jones list
  public addToWatchList(share: ShareDetails) {
    this.databaseService.addToWatchList(share);
    this.watchList = this.databaseService.getWatchList();
    this.alertService.info("Share added to watchlist.");
  }

  // remove share from watchlist
  public removeFromWatchList(symbol: string) {
    this.databaseService.removeFromWatchList(symbol);
    this.watchList = this.databaseService.getWatchList();
    this.alertService.info("Share removed from watchlist.");
  }
}
