import { ActivatedRoute } from "@angular/router";
import { AlphavantageService } from "./../../services/alphavantage/alphavantage.service";
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  // symbol from request parameter (example: GOOGL)
  symbol: string = "";

  jsonData: any;
  chartData: any[] = [
    {
      name: "",
      series: [],
    },
  ];
  chartDataLoaded = false;

  //chart variables:
  xAxisTicks: any[] = [];

  colorScheme = {
    domain: ["#ffc107", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  constructor(
    private alphavantageService: AlphavantageService,
    private route: ActivatedRoute
  ) {}

  // get share symbol from url, get chart data from service
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.symbol) {
        this.symbol = params.symbol;
        //this.getChartIntraday();
        this.getChartWeekly();
      } else {
        // TODO: change to ui message
        console.log("no symbol!");
      }
    });
  }

   //get chart data weekly from alpha vantage service and construct chart
  getChartWeekly() {
    this.alphavantageService
      .getShareWeeklyData(this.symbol)
      .subscribe((data) => {
        this.jsonData = data["Weekly Time Series"];
        // clear the dataset
        this.chartData = [
          {
            name: this.symbol,
            series: [],
          },
        ];
        this.xAxisTicks = [];
        let i = 1;
        for (const item in this.jsonData) {
          // display only 3 data points on X-Axis
          if (i == 1 || i % 25 == 0)
           this.xAxisTicks.push(item);
          i++;
          this.chartData[0].series.push({
            name: item,
            value: this.jsonData[item]["4. close"],
          });
          // 52 weeks only
          if (i == 52) break;
        }

        // reverse chronological order
        this.chartData[0].series.reverse();
        this.xAxisTicks.reverse();

        // boolean for loading chart
        this.chartDataLoaded = true;
      });
  }
  
  //get chart data intraday from alpha vantage service and construct chart
  getChartIntraday() {
    this.alphavantageService
      .getShareIntraDayData(this.symbol)
      .subscribe((data) => {
        this.jsonData = data["Time Series (5min)"];
        const information = data["Meta Data"]["1. Information"];
        console.log(information);
        // clear the dataset
        this.chartData = [
          {
            name: this.symbol,
            series: [],
          },
        ];
        this.xAxisTicks = [];
        let i = 1;
        for (const item in this.jsonData) {
          // display only 5 data points on X-Axis
          if (i == 1 || i % 25 == 0) this.xAxisTicks.push(item);
          i++;

          // fetch the dataset symbol from the HTTP JSON response
          this.chartData[0].series.push({
            name: item,
            value: this.jsonData[item]["4. close"],
          });
        }

        // reverse chronological order
        this.chartData[0].series.reverse();
        this.xAxisTicks.reverse();

        // boolean for loading chart
        this.chartDataLoaded = true;
      });
  }
}
