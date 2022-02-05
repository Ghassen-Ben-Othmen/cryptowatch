type CoinDetail = {
    uuid: string;
    symbol: string;
    name: string;
    description: string;
    color: string | null;
    iconUrl: string | null;
    websiteUrl: string | null;
    links: {
        name: string;
        url: string;
        type: string;
    }[];
    supply: {
        confirmed: boolean;
        circulating: string;
        total: string | null;
    };
    "24hVolume": string;
    marketCap: string;
    price: string;
    btcPrice: string;
    priceAt: number | null;
    change: string;
    rank: number;
    numberOfMarkets: number;
    numberOfExchanges: number;
    listedAt: number | null;
    sparkline: string[];
    allTimeHigh: {
        price: string;
        timestamp: number;
    };
    coinrankingUrl: string | null;
}

export default CoinDetail;