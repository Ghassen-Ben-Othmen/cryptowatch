import CoinDetailService from "./coinDetailService";
import CoinHistoryService from "./coinHistoryService";
import CoinsService from "./coinsService";
import CurrenciesRefService from "./currenciesRefService";
import ExchangeService from "./exchangesService";
import GlobalStatsService from "./globalStatsService";
import NewsService from "./newsService";

export const globalStatsService = new GlobalStatsService();
export const currenciesRefService = new CurrenciesRefService();
export const coinsService = new CoinsService();
export const exchangesService = new ExchangeService();
export const newsService = new NewsService();
export const coinDetailService = new CoinDetailService();
export const coinHistoryService = new CoinHistoryService();