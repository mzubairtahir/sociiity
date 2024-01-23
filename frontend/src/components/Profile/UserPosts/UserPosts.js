import React, { useState } from "react";
import FeedCommon from "../../Feed/FeedCommon";

export default function UserPosts() {
  const [zeroPosts, setZeroPosts] = useState(false);

  return (
    <>
      {!zeroPosts ? (
        <FeedCommon
          postsShowTitle={"Posts"}
          onzeropostsfunc={() => {
            setZeroPosts(true);
          }}
          fetchingLink={"/api/user/posts"}
        />
      ) : (
        <>
          <div className="p-4 text-danger text-center">
            <h5>No posts to show</h5>
          </div>
        </>
      )}
    </>
  );
}
