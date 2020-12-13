import { Component, HostBinding, OnInit, Output, EventEmitter } from "@angular/core";
import { ShareInfo } from "app/model/share-info";
import { AlphavantageService } from "app/services/alphavantage/alphavantage.service";
import { UpgradableComponent } from "theme/components/upgradable";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  //styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UpgradableComponent implements OnInit {
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  @Output() symbolEvent = new EventEmitter<string>();

  // search symbol (example: GOOGL)
  symbol: string = "";
  jsonData: any;
  

  //table

  public headers = ['Symbol', 'Name', 'Type', 'Region', 'Marketopen', 'Marketclose', 'Timezone', 'Currency', 'Matchscore', '  '];
  public suggestionsList: ShareInfo[] = [];

  constructor(private alphavantageService: AlphavantageService) {
    super();
  }

  ngOnInit() {}

  // generate list of best matches for symbol
  generateSuggestionsList(symbol: string) {
    this.alphavantageService.getShareSuggestions(symbol).subscribe((data) => {
      this.suggestionsList = [];
      this.jsonData = data["bestMatches"];
      for (const item in this.jsonData) {
        const symbol = this.jsonData[item]["1. symbol"];
        const name = this.jsonData[item]["2. name"];
        const type = this.jsonData[item]["3. type"];
        const region = this.jsonData[item]["4. region"];
        const marketOpen = this.jsonData[item]["5. marketOpen"];
        const marketClose = this.jsonData[item]["6. marketClose"];
        const timezone = this.jsonData[item]["7. timezone"];
        const currency = this.jsonData[item]["8. currency"];
        const matchScore = this.jsonData[item]["9. matchScore"];
        let shareInfo: ShareInfo = new ShareInfo(symbol, name, type, region, marketOpen, marketClose, timezone,currency, matchScore);
        this.suggestionsList.push(shareInfo);
        console.log(shareInfo);
      }
    });
  }

  populateSearch(value: string) {
    this.symbol = value;
    this.sendSymbol();
  }

  //receiver for symbol
  receiveSymbol($event) {
    this.symbol = $event;
  }
  sendSymbol() {
    if(this.symbol != "")
      this.symbolEvent.emit(this.symbol);
  }
 
}
