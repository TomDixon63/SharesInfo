// service class for database access
// actual only browser local storage access
// some of the functions could be implemented in the ui but we will work with a database in future

import { Injectable } from "@angular/core";
import { ShareDetails } from "./../../model/share-details";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor() {}

  //get dowJonesList from local storage
  public getDowJonesList() {
    return JSON.parse(localStorage.getItem("dowJonesList"));
  }

  //set dowJonesList in local storage
  public setDowJonesList(list: ShareDetails[]) {
    localStorage.setItem("dowJonesList", JSON.stringify(list));
  }

  //get watchlist from local storage
  public getWatchList() {
    return JSON.parse(localStorage.getItem("watchList"));
  }

  //set watchlist in local storage
  public setWatchList(list: ShareDetails[]) {
    localStorage.setItem("watchList", JSON.stringify(list));
  }

  //add share to watchlist
  public addToWatchList(shareDetails: ShareDetails) {
    let shareIsPresent: boolean = false;
    let watchList: ShareDetails[] = this.getWatchList();
    //do not add a share again
    for (var i = watchList.length - 1; i >= 0; i--) {
      let tmpSymbol: string = watchList[i].symbol;
      if (tmpSymbol.includes(shareDetails.symbol)) {
        shareIsPresent = true;
        break;
      }
    }
    if (!shareIsPresent) {
      watchList.push(shareDetails);
      this.setWatchList(watchList);
    }
  }

  //remove share from watchlist
  public removeFromWatchList(symbol: string) {
    let watchList: ShareDetails[] = this.getWatchList();
    for (var i = watchList.length - 1; i >= 0; i--) {
      let tmpSymbol: string = watchList[i].symbol;
      if (tmpSymbol.includes(symbol)) {
        watchList.splice(i, 1);
        this.setWatchList(watchList);
        break;
      }
    }
  }
}
