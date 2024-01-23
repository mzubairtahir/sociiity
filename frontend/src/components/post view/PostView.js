import React, { useEffect, useState } from "react";
import useFetchWrapper from "../../utils/fetchWrapper";
import Post from "../Feed/post/Post";
import { useParams } from "react-router-dom";
import Loading from "../../common/loading/Loading";

export default function PostView() {
  const fetchFunction = useFetchWrapper();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (postId === null) {
      } else {
        try {
          const response = await fetchFunction({
            url: `/api/post/postview?i=${postId}`,
            nonLogin: true,
          });

          const data = await response.json();
          if (data.STATUS === "FOUND") {
            setData(data.DATA);
            document.title = `${data.DATA.user.full_name}: ${data.DATA.text_content}`;
          } else {
            setData(null);
          }
        } catch (error) {}
      }
      setLoading(false);
    };
    fetchData();
  }, [postId]);

  return loading ? (
    <Loading />
  ) : data !== null ? (
    <>
      <div>{<Post data={data} />}</div>
    </>
  ) : (
    <>
      <div className="d-flex justify-content-center p-5">
        <h4>
          Could not found the post. May be you should go to <a href="/">Home</a>{" "}
          page
        </h4>
      </div>
    </>
  );
}
