import React from 'react';

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <button
        className="pagination-prevbtn"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        style={{ opacity: page === 1 ? 0.2 : 1 }}
      >
        <img src={require(`images/components/next.png`)} alt="" />
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i}
            className={`pagination-numbtn ${page === i + 1 ? 'active' : null}`}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </button>
        ))}
      <button
        className="pagination-nextbtn "
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        style={{ opacity: page === numPages ? 0.2 : 1 }}
      >
        <img src={require(`images/components/next.png`)} alt="" />
      </button>
    </div>
  );
}

export default Pagination;
