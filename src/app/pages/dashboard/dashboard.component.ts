import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ShareDetails } from "./../../model/share-details";
import { AlphavantageService } from "app/services/alphavantage/alphavantage.service";
import { Component, HostBinding } from "@angular/core";
import { UpgradableComponent } from "theme/components/upgradable";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent extends UpgradableComponent {
  //SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  //dow jones top 4 by market cap, alpha does allow only a few requests/min when free api key
  private dowJonesSymbols = ["AAPL", "MSFT", "V", "WMT"];
  

  //table headers for all  tables
  public headers = [
    "Name / Symbol",
    "Price",
    "Change",
    "Change percent",
  ];

  //list with dow jones shares
  public dowJonesList: ShareDetails[] = [];

  //watchlist
  public watchList: ShareDetails[] = [];

  constructor(
    private alphavantageService: AlphavantageService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  // get dow jones shares from alpha on app start, after from local storage
  // add watchList to local storage on app start
  ngOnInit() {
    if (localStorage.getItem("dowJonesList")) {
      this.dowJonesList = JSON.parse(localStorage.getItem("dowJonesList"));
    } else {
      this.getDowJones();
    }
    if (localStorage.getItem("watchList")) {
      this.watchList = JSON.parse(localStorage.getItem("watchList"));
    } else {
      this.getDowJones();
      localStorage.setItem("watchList", JSON.stringify(this.watchList));
    }
  }

  //get dow jones shares
  private getDowJones() {
    for (const symbol of this.dowJonesSymbols) {
      let shareDetails = new ShareDetails();
      this.alphavantageService.getShareDetails(symbol).subscribe((data) => {
        shareDetails.symbol = data["Global Quote"]["01. symbol"];
        shareDetails.name = this.symbol2NameMapper(symbol);
        shareDetails.price = data["Global Quote"]["05. price"];
        shareDetails.change = data["Global Quote"]["09. change"];
        shareDetails.changePercent = data["Global Quote"]["10. change percent"];
        this.dowJonesList.push(shareDetails);
        //add to local storage
        localStorage.setItem("dowJonesList", JSON.stringify(this.dowJonesList));
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

  // maps symbol to name
  // this is needed to avoid a second request to alpha to determine the name,
  // as "Global Quote"  doesn't contain it
  private symbol2NameMapper(symbol: string) {
    if (symbol.length == 0) {
      return;
    }
    if (symbol.includes("AAPL")) {
      return "Apple";
    }
    if (symbol.includes("MSFT")) {
      return "Microsoft";
    }
    if (symbol.includes("V")) {
      return "Visa";
    }
    if (symbol.includes("WMT")) {
      return "Wallmart";
    }
  }
}
