import React from 'react';
import NewsModel from '../models/news';
import New from './New';

interface Props {
    news: NewsModel[];
}

function NewsList({ news }: Props) {
    return (
        <React.Fragment>
            {
                news.map(newz => <New key={newz._id} newz={newz} />)
            }
        </React.Fragment>
    );
}

export default NewsList;
