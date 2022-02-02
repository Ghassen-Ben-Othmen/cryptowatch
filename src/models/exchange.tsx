type Exchange = {
    id: string;
    name: string;
    year_established: number | null;
    country: string;
    description: string;
    url: string | null;
    image: string | null;
    has_trading_incentive: boolean;
    trust_score: number;
    trust_score_rank: number;
    trade_volume_24h_btc: number;
    trade_volume_24h_btc_normalized: number;
}

export default Exchange;