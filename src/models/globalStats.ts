type GlobalStats = {
    status: string;
    data: {
        totalCoins: number;
        totalMarkets: number;
        totalExchanges: number;
        totalMarketCap: string;
        total24hVolume: string
    }
}

export default GlobalStats;