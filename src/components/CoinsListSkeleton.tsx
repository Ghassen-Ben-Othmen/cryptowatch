import React from 'react';
import CoinSkeleton from './CoinSkeleton';

interface Props {
    size: number;
}

function CoinsListSkeleton({ size }: Props) {
    return (
        <React.Fragment>
            {
                Array(size).fill(0).map((_, i) => <CoinSkeleton key={i} />)
            }
        </React.Fragment>
    );
}

export default CoinsListSkeleton;
