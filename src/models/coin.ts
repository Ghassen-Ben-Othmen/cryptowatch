type Coin = {
    uuid: string;
    symbol: string;
    name: string;
    color: string | null;
    iconUrl: string | null;
    marketCap: string;
    price: string;
    listedAt: number | null;
    tier: number;
    change: string;
    rank: number;
    sparkline: (string | null)[];
    lowVolume: boolean;
    coinrankingUrl: string | null;
    "24hVolume": string;
    btcPrice: string;
}

export default Coin;