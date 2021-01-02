import { AlertService } from "./../../components/alert/alert.service";
import { Router } from "@angular/router";
import {
  Component,
  HostBinding,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { ShareInfo } from "app/model/share-info";
import { AlphavantageService } from "app/services/alphavantage/alphavantage.service";
import { UpgradableComponent } from "theme/components/upgradable";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent extends UpgradableComponent implements OnInit {
  // SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  jsonData: any;

  //alert options
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  //table headers
  public headers = [
    "Symbol",
    "Name",
    "Type",
    "Region",
    "Currency",
    "Matchscore",
  ];
  public suggestionsList: ShareInfo[] = [];

  constructor(
    private alphavantageService: AlphavantageService,
    private alertService: AlertService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {}

  // generate list of best matches for symbol
  // if  more > 5 requests/min, show alert with the alpha message
  generateSuggestionsList(symbol: string) {
    if (symbol.length < 1) {
      this.alertService.error("Please enter a symbol to search a share!");
    } else {
      this.alphavantageService.getShareSuggestions(symbol).subscribe((data) => {
        this.suggestionsList = [];
        const note: string = JSON.stringify(data);
        if (!note.includes("Note")) {
          this.jsonData = data["bestMatches"];
          for (const item in this.jsonData) {
            const symbol = this.jsonData[item]["1. symbol"];
            const name = this.jsonData[item]["2. name"];
            const type = this.jsonData[item]["3. type"];
            const region = this.jsonData[item]["4. region"];
            const currency = this.jsonData[item]["8. currency"];
            const matchScore = this.jsonData[item]["9. matchScore"];
            let shareInfo: ShareInfo = new ShareInfo(
              symbol,
              name,
              type,
              region,
              currency,
              matchScore
            );
            this.suggestionsList.push(shareInfo);
          }
        } else {
          this.alertService.warn(
            "Alpha Vantage says: " +
              note +
              " - SHARESINFO says: Keep calm and try again in a minute :-)"
          );
        }
      });
    }
  }

  // navigate to details page
  public navigateToDetailsPage(symbol: string) {
    var url: string = "/app/details?symbol=" + symbol;
    this.router.navigateByUrl(url);
  }
}
