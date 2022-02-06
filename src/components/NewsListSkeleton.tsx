import React from 'react';
import NewSkeleton from './NewSkeleton';

interface Props {
    size: number
}

function NewsListSkeleton({ size }: Props) {
    return (
        <React.Fragment>
            {
                Array(size).fill(0).map((_, i) => <NewSkeleton key={i} />)
            }
        </React.Fragment>
    );
}

export default NewsListSkeleton;
