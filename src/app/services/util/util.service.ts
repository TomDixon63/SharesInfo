import { ShareDetails } from "./../../model/share-details";
//service class with various util functions

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor() {}

  // maps response to a ShareDetails object
  public globalQuote2ShareDetailsMapper(data: any) {
    let shareDetails = new ShareDetails();
    shareDetails.symbol = data["Global Quote"]["01. symbol"];
    shareDetails.open = data["Global Quote"]["02. open"];
    shareDetails.high = data["Global Quote"]["03. high"];
    shareDetails.low = data["Global Quote"]["04. low"];
    shareDetails.price = data["Global Quote"]["05. price"];
    shareDetails.volume = data["Global Quote"]["06. volume"];
    shareDetails.change = data["Global Quote"]["09. change"];
    shareDetails.changePercent =
      data["Global Quote"]["10. change percent"];
      shareDetails.name = this.symbol2NameMapper(shareDetails.symbol);
    return shareDetails;
  }

  // maps share symbol to share name
  // this is needed to avoid a second request to alpha to determine the name,
  // as "Global Quote"  doesn't contain it
  public symbol2NameMapper(symbol: string) {
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
