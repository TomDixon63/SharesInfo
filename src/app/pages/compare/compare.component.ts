import { SharePerfomance } from "./../../model/share-performance";
import { AlphavantageService } from "./../../services/alphavantage/alphavantage.service";
import { UpgradableComponent } from "theme/components/upgradable";
import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-compare",
  templateUrl: "./compare.component.html",
  styleUrls: ["./compare.component.scss"],
})
export class CompareComponent extends UpgradableComponent implements OnInit {
  //SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  //share details
  public sharePerfomanceFirst = new SharePerfomance();
  public sharePerfomanceSecond = new SharePerfomance();
  public sharePerfomanceThird = new SharePerfomance();

  //search buttons disabled
  isSearchButtonSecondDisabled = true;
  isSearchButtonThirdDisabled = true;

  constructor(private alphavantageService: AlphavantageService) {
    super();
  }

  ngOnInit(): void {}

  //TODO: alpha does not provide an errorcode in error response, just a text, so here a primitive error handling, solution to be found
  //TODO: error when symbol not found
  //TODO: refactor, move calcs to their own service and improve them
  // share performance data
  public getSharePerformanceData(symbol: string, searchfor: string) {

    
    if (symbol.length < 1) {
      window.alert("symbol");
      return;
    }

    this.alphavantageService.getShareMonthlyData(symbol).subscribe((data) => {
      let n: string = JSON.stringify(data);

      if (n.includes("Error")) {
        window.alert("No data available");
        return;
      }

      let i = 1;
      let sharePerfomance = new SharePerfomance();
      let jsonData: any = data["Monthly Time Series"];

      for (var item in jsonData) {
        //1: month, 26: 3 months ... 5 years
        switch (i) {
          case 1:
            console.log(i + ". " + jsonData[item]["4. close"]);
            // price is close actual month
            let price: number = jsonData[item]["4. close"];
            //TODO: FF throws an error when .toFixed(2) is applied, price is shown with more than 2 digits
            sharePerfomance.price = price.toString();
            sharePerfomance.symbol = symbol.toUpperCase();
            break;
          case 2:
            sharePerfomance.per1Month = (
              ((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100
            ).toFixed(2);
            console.log("1 m: " + sharePerfomance.per1Month);
            break;
          case 26:
            sharePerfomance.per6Month = (
              ((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100
            ).toFixed(2);
            console.log("6 m: " + sharePerfomance.per6Month);
            break;
          case 52:
            sharePerfomance.per1Year = (
              ((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100
            ).toFixed(2);
            console.log("1 y: " + sharePerfomance.per1Year);
            break;
          case 156:
            sharePerfomance.per3Year = (
              ((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100
            ).toFixed(2);
            console.log("3 y: " + sharePerfomance.per3Year);
            break;
          default:
            break;
        }
        i++;
      }

      //determine which performance is up
      if (
        !!sharePerfomance.per1Month &&
        !sharePerfomance.per1Month.includes("-")
      ) {
        sharePerfomance.per1MonthUp = true;
      }
      if (
        !!sharePerfomance.per6Month &&
        !sharePerfomance.per6Month.includes("-")
      ) {
        sharePerfomance.per6MonthUp = true;
      }
      if (
        !!sharePerfomance.per1Year &&
        !sharePerfomance.per1Year.includes("-")
      ) {
        sharePerfomance.per1YearUp = true;
      }
      if (
        !!sharePerfomance.per3Year &&
        !sharePerfomance.per3Year.includes("-")
      ) {
        sharePerfomance.per3YearUp = true;
      }

      //determine which search is carried out and enable the next search button (only once)
      if (searchfor === "searchFirst") {
        this.sharePerfomanceFirst = sharePerfomance;
        this.isSearchButtonSecondDisabled = false;
      }
      if (searchfor === "searchSecond") {
        this.sharePerfomanceSecond = sharePerfomance;
        this.isSearchButtonThirdDisabled = false;
      }
      if (searchfor === "searchThird") {
        this.sharePerfomanceThird = sharePerfomance;
      }
    });
  }
}
