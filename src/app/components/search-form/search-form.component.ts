import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { ShareInfo } from "../../model/share-info";
import { ShareDetails } from "../../model/share-details";
import { AlphavantageService } from "../../services/alphavantage/alphavantage.service";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output() symbolEvent = new EventEmitter<string>();

  //isHidden = true;

  // share search symbol
  symbol: string = "";
  jsonData: any;
  suggestionsList: ShareInfo[] = [];

  // share details
  shareDetailsData: ShareDetails;

  constructor(private service: AlphavantageService) {}

  ngOnInit() {}

  // generate list of best matches for symbol
  generateSuggestionsList(symbol: string) {
    this.service.getShareSuggestions(symbol).subscribe((data) => {
      this.suggestionsList = [];
      this.jsonData = data["bestMatches"];
      for (const item in this.jsonData) {
        const symbol = this.jsonData[item]["1. symbol"];
        const name = this.jsonData[item]["2. name"];
        let shareInfo: ShareInfo = new ShareInfo(symbol, name);
        console.log(shareInfo);
        this.suggestionsList.push(shareInfo);
      }
      //this.isHidden = (this.isHidden == true && this.nameData.length > 0) ? false : true;
    });
  }

  populateSearch(value: string) {
    this.symbol = value;
    //this.isHidden = (this.isHidden == true) ? false : true;
    this.sendSymbol();
  }

  sendSymbol() {
    if (this.symbol != "") this.symbolEvent.emit(this.symbol);
  }

}
