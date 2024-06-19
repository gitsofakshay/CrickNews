import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card">
        <div style={{ diplay: 'flex', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill text-bg-danger">{source}</span>
        </div>
        <img src={imageUrl} className="card-img-top rounded mx-auto d-block" alt="not loaded" />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem