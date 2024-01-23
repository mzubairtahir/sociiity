import React, { useEffect, useState } from "react";
import LikingContext from "./context/likingContext";
import Like from "./Like";
import Dislike from "./Dislike";

export default function PostFooter({ props }) {
  const [totalDislikes, setTotalDislikes] = useState(null);
  const [totalLikes, setTotalLikes] = useState(null);

  const [likingState, setLikingState] = useState({
    liked: false,
    disliked: false,
  });

  const setLikingStateWrapper = (type, value) => {
    if (type === "like") {
      if (value && likingState.disliked) {
        setTotalDislikes((pre) => pre - 1);
        setLikingState({
          liked: value,
          disliked: false,
        });
      } else {
        setLikingState({
          liked: value,
          disliked: likingState.disliked,
        });
      }
    } else {
      if (value && likingState.liked) {
        setTotalLikes((pre) => pre - 1);
        setLikingState({
          disliked: value,
          liked: false,
        });
      } else {
        setLikingState({
          disliked: value,
          liked: likingState.liked,
        });
      }
    }
  };

  useEffect(() => {
    setLikingState({
      disliked: props.data.dislikedOrNot,
      liked: props.data.likedOrNot,
    });
    setTotalLikes(props.data.likes);
    setTotalDislikes(props.data.dislikes);
  }, [props]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center w-75">
          <LikingContext.Provider
            value={{ likingState, setLikingStateWrapper }}
          >
            <Like id={props.data.id} counter={[totalLikes, setTotalLikes]} />
            <Dislike
              id={props.data.id}
              counter={[totalDislikes, setTotalDislikes]}
            />
          </LikingContext.Provider>
        </div>
      </div>
    </>
  );
}
