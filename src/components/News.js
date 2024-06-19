import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import NewsLoading from './NewsLoading';
import PropTypes from 'prop-types'
// import { defaults } from 'gh-pages';
import InfiniteScroll from "react-infinite-scroll-component";
import notLoaded from './notLoaded.jpg';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizefirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizefirstLetter(props.category)} - CrickNews`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // }

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px', marginTop: '90px' }}>CrickNews - Top {capitalizefirstLetter(props.category)} headlines</h1>
      {loading && <NewsLoading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<NewsLoading />}
      >
        <div className='container my-3'>
          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-4 my-2' key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : notLoaded} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>

          {/* Next and Previous button code */}
          {/* <div className='container d-flex justify-content-between'>
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}

        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
  apiKey: 'apikey'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string
}

export default News