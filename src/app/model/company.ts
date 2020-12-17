// company information

export class Company {
  name: String;
  description: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  address: string;
  yearHigh: string;
  yearLow: string;
  dividendDate: string;
  dividendPerShare: string;
  dividendYield: string;

  constructor() {}

  /**  alpha vantage json response:
     * {
    "Symbol": "IBM",
    "AssetType": "Common Stock",
    "Name": "International Business Machines Corporation",
    "Description": "International Business Machines Corporation ..." 
    "Exchange": "NYSE",
    "Currency": "USD",
    "Country": "USA",
    "Sector": "Technology",
    "Industry": "Information Technology Services",
    "Address": "One New Orchard Road, Armonk, NY, United States, 10504",
    "FullTimeEmployees": "352600",
    "FiscalYearEnd": "December",
    "LatestQuarter": "2020-09-30",
    "MarketCapitalization": "110072274944",
    "EBITDA": "15690000384",
    "PERatio": "14.0009",
    "PEGRatio": "9.2265",
    "BookValue": "23.801",
    "DividendPerShare": "6.52",
    "DividendYield": "0.0525",
    "EPS": "8.823",
    "RevenuePerShareTTM": "84.402",
    "ProfitMargin": "0.1053",
    "OperatingMarginTTM": "0.1205",
    "ReturnOnAssetsTTM": "0.0372",
    "ReturnOnEquityTTM": "0.401",
    "RevenueTTM": "75030003712",
    "GrossProfitTTM": "36489000000",
    "DilutedEPSTTM": "8.823",
    "QuarterlyEarningsGrowthYOY": "0.011",
    "QuarterlyRevenueGrowthYOY": "-0.026",
    "AnalystTargetPrice": "137.13",
    "TrailingPE": "14.0009",
    "ForwardPE": "10.6157",
    "PriceToSalesRatioTTM": "1.4828",
    "PriceToBookRatio": "5.2212",
    "EVToRevenue": "2.2061",
    "EVToEBITDA": "10.8101",
    "Beta": "1.2399",
    "52WeekHigh": "150.8394",
    "52WeekLow": "86.9458",
    "50DayMovingAverage": "118.6243",
    "200DayMovingAverage": "122.1266",
    "SharesOutstanding": "891057024",
    "SharesFloat": "889684888",
    "SharesShort": "22028993",
    "SharesShortPriorMonth": "24559462",
    "ShortRatio": "4.14",       
    "ShortPercentOutstanding": "0.02",
    "ShortPercentFloat": "0.0247",
    "PercentInsiders": "0.124",
    "PercentInstitutions": "58.593",
    "ForwardAnnualDividendRate": "6.52",
    "ForwardAnnualDividendYield": "0.0525",
    "PayoutRatio": "0.5756",
    "DividendDate": "2020-12-10",
    "ExDividendDate": "2020-11-09",
    "LastSplitFactor": "2:1",
    "LastSplitDate": "1999-05-27"
    }*/
}
