import React from 'react';
import CoinModel from '../models/coin';
import Coin from './Coin';

interface Props {
    coins: CoinModel[];
    currencySign: string
}

function CoinsList({ coins, currencySign }: Props) {
    return (
        <React.Fragment>
            {
                coins.map(coin => <Coin key={coin.uuid} coin={coin} currencySign={currencySign} />)
            }
        </React.Fragment>
    );
}

export default CoinsList;
