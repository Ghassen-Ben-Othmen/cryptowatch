import React from 'react';
import ExchnageSkeleton from './ExchnageSkeleton';

interface Props {
    size: number;
}

function ExchangesListSkeleton({ size }: Props) {
    return (
        <React.Fragment>
            {
                Array(size).fill(0).map((_, i) => <ExchnageSkeleton key={i} />)
            }
        </React.Fragment>
    );
}

export default ExchangesListSkeleton;
