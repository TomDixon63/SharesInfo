export class ShareDetails {
    /* alpha vantage json response:
    {
        "Global Quote": {
            "01. symbol": "IBM",
            "02. open": "124.1000",
            "03. high": "125.0000",
            "04. low": "123.0900",
            "05. price": "123.5200",
            "06. volume": "5987991",
            "07. latest trading day": "2020-11-30",
            "08. previous close": "124.3500",
            "09. change": "-0.8300",
            "10. change percent": "-0.6675%"
        }
    }*/

    constructor(
        public symbol: string,
        public open: number,
        public high: number,
        public low: number,
        public price: number,
        public volume: number,
        public latestTradingDay: string,
        public previousClose: string,
        public change: String,
        public changePercent: string
        
    ){}
}