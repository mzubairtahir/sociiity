import React, { useEffect, useState } from "react";
import Post from "./post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchWrapper from "../../utils/fetchWrapper";
import Loading from "../../common/loading/Loading";
import style from "./styles/FeedCommon.module.css";

export default function FeedCommon({
  fetchingLink,
  postsShowTitle,
  onzeropostsfunc,
}) {
  const [posts, setPosts] = useState([]);
  const fetchFunction = useFetchWrapper();

  const [showFetchError, setShowFetchError] = useState(false);
  const [nextLink, setNextLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMore = () => {
    fetch(nextLink)
      .then((resp) => resp.json())
      .then((data) => {
        setNextLink(data.links.next);
        setPosts((pre) => pre.concat(data.results));
      })
      .catch((err) => {
        setShowFetchError(true);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetchFunction({ url: fetchingLink });

        const data = await response.json();
        setNextLink(data.links.next);
        if (data.results.length === 0) {
          onzeropostsfunc();
        } else {
          setPosts(data.results);
        }
      } catch (error) {
        setShowFetchError(true);
      }
      setLoading(false);
    };
    setShowFetchError(false);
    fetchData();
  }, [fetchingLink]);

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <div className={`feed`}>
        <div>
          <p className="section-title">{postsShowTitle}</p>
        </div>
        <div className={`d-flex flex-column`}>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMore}
            hasMore={nextLink !== null}
            loader={<h4>Loading...</h4>}
          >
            {posts.map((post, index) => {
              return (
                <div key={index} style={{ paddingTop: "5px" }}>
                  <Post data={post} />
                </div>
              );
            })}
          </InfiniteScroll>
          {nextLink === null && (
            <>
              <div className="d-flex justify-content-center p-4">
                <span className={style.endMessage}>
                  You've reached the end of the road. But fear not, the journey
                  will continue.
                </span>
              </div>
            </>
          )}
        </div>
        {showFetchError && (
          <h4 className="text-center text-danger ">Failed to fetch posts</h4>
        )}
      </div>
    </>
  );
}
