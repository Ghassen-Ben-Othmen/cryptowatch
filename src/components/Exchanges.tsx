import React from 'react';
import ExchangeModel from '../models/exchange';
import Exchange from './Exchange';

interface Props {
    exchanges: ExchangeModel[];
}

function Exchanges({ exchanges }: Props) {
    return (
        <React.Fragment>
            {
                exchanges.map(exchange => <Exchange key={exchange.id} exchange={exchange} />)
            }
        </React.Fragment>
    );
}

export default Exchanges;
