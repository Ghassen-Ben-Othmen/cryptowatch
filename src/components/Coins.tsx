import React from 'react';
import CoinModel from '../models/coin';
import Coin from './Coin';

interface Props {
    coins: CoinModel[];
}

function Coins({ coins }: Props) {
    return (
        <React.Fragment>
            {
                coins.map(coin => <Coin key={coin.uuid} coin={coin} />)
            }
        </React.Fragment>
    );
}

export default Coins;
