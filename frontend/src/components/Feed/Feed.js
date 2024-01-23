import React, { useState } from "react";
import FeedCommon from "./FeedCommon";
import { Link } from "react-router-dom";

export default function Feed() {
  const [showZeroPosts, setShowZeroPosts] = useState(false);

  document.title = "Home";

  return (
    <>
      {!showZeroPosts ? (
        <FeedCommon
          postsShowTitle={"Feed"}
          onzeropostsfunc={() => {
            setShowZeroPosts(true);
          }}
          fetchingLink={"/api/feed/browse"}
        />
      ) : (
        <>
          <div className="p-3 text-center" style={{ color: "#dddddd" }}>
            <h2 className="noDataMessage">Be the First to Share!</h2>
            <div className="noDataMessageDetail">
              No posts in your city yet! Congratulations! You have the chance to
              be the first uploader of your city.
            </div>
            <Link to={"/create"}>
              <button className="btn btn-dark my-2">Make Post?</button>
            </Link>
            <span className="mx-2">OR</span>
            <Link to={"/search"}>
              <button className="btn btn-dark my-2">Search Posts</button>
            </Link>
            <div>OR set your profile if you have not set yet!</div>
            <Link to={"/user"}>
              <button className="btn btn-dark my-2">Set Profile</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
