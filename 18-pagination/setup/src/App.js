import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const increasePage = () => {
    if (page >= data[page].length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  const decreasePage = () => {
    if (page === 0) {
      setPage(data[page].length - 1);
    } else {
      setPage(page - 1);
    }
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>
        <div className="underline" />
      </div>
      <section className="followers">
        {!loading && (
          <>
            <div className="container">
              {followers.map((follower) => {
                return <Follower key={follower.id} {...follower} />;
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn" onClick={decreasePage}>
                back
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button className="btn" onClick={increasePage}>
                next
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
