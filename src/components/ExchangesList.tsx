import React from 'react';
import ExchangeModel from '../models/exchange';
import Exchange from './Exchange';

interface Props {
    exchanges: ExchangeModel[];
}

function ExchangesList({ exchanges }: Props) {
    return (
        <React.Fragment>
            {
                exchanges.map(exchange => <Exchange key={exchange.id} exchange={exchange} />)
            }
        </React.Fragment>
    );
}

export default ExchangesList;
