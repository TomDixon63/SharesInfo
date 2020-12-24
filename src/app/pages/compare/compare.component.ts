import { SharePerfomance } from "./../../model/share-performance";
import { AlphavantageService } from "./../../services/alphavantage/alphavantage.service";
import { UpgradableComponent } from "theme/components/upgradable";
import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-compare",
  templateUrl: "./compare.component.html",
  //styleUrls: ['./compare.component.scss']
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

  //determines which search is selected, function parameter
  searchFirst: string = "";
  searchSecond: string = "";
  searchThird: string = "";

  //determines if search button is disabled
  isSearchButtonSecondDisabled = true;
  isSearchButtonThirdDisabled = true;

  constructor(private alphavantageService: AlphavantageService) {
    super();
  }

  ngOnInit(): void {}

  //TODO: refactor, move calcs to their own service and improve them
  // share performance data
  public getSharePerformanceData(symbol: string, searchfor: string) {
    this.alphavantageService.getShareMonthlyData(symbol).subscribe((data) => {
      let i = 1;
      let jsonData: any = data["Monthly Time Series"];

      for (var item in jsonData) {
        //1: month, 26: 3 months ... 5 years
        switch (i) {
          case 1:
            console.log(i + ". " + jsonData[item]["4. close"]);
            // price is close actual month
            let price: number = jsonData[item]["4. close"];
            this.sharePerfomanceFirst.price = price;
            break;
          case 2:
            this.sharePerfomanceFirst.per1Month = (
              ((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100
            ).toFixed(2);
            console.log("1 m: " + this.sharePerfomanceFirst.per1Month);
            break;
          case 26:
            this.sharePerfomanceFirst.per6Month = (
              ((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100
            ).toFixed(2);
            console.log(
              "6 m: " + this.sharePerfomanceFirst.per6Month
            );
            break;
          case 52:
            this.sharePerfomanceFirst.per1Year =
              (((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100).toFixed(2);
            console.log(
              "1 y: " + this.sharePerfomanceFirst.per1Year
            );
            break;
          case 156:
            this.sharePerfomanceFirst.per3Year =
              (((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100).toFixed(2);
            console.log(
              "3 y: " + this.sharePerfomanceFirst.per3Year
            );
            break;
          case 260:
            this.sharePerfomanceFirst.per5Year =
              (((price - jsonData[item]["4. close"]) /
                jsonData[item]["4. close"]) *
              100).toFixed(2);
            console.log(
              "5 y: " + this.sharePerfomanceFirst.per5Year
            );
            break;
          default:
            break;
        }

        i++;
      }

      //this.shareDetailsFirst.price = data["Monthly Time Series"][0]["04. close"];
      //this.shareDetailsFirst.open = data["Global Quote"]["02. open"];
      //this.shareDetailsFirst.high = data["Global Quote"]["03. high"];
      //this.shareDetailsFirst.low = data["Global Quote"]["04. low"];
      //this.shareDetailsFirst.price = data["Global Quote"]["05. price"];
      //this.shareDetailsFirst.change = data["Global Quote"]["09. change"];
      //this.shareDetailsFirst.changePercent =
      //  data["Global Quote"]["10. change percent"];
      //  console.log(this.shareDetailsFirst.price);
    });
  }
}
