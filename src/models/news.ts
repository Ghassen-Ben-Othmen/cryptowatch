type News = {
    _id: string;
    title: string;
    author: string | null;
    published_date: string;
    published_date_precision: string;
    link: string;
    clean_url: string;
    summary: string;
    rights: string;
    rank: number;
    topic: string;
    country: string;
    language: string;
    authors: string[];
    media: string | null;
    is_opinion: boolean;
    twitter_account: string | null;
    _score: number;
}

export default News;