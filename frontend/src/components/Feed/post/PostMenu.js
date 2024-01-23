import React, { useContext, useEffect, useRef } from "react";
import style from "../styles/Postmenu.module.css";
import otherThanEvent from "../../../common/otherThanClick";
import useFetchWrapper from "../../../utils/fetchWrapper";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";
import userStateContext from "../../../states/userStateContext";

export default function PostMenu({ postid, showFunction, postUser }) {
  const overlay = useRef(null);
  const showMessage = useShowMessageApi();
  const fetchFunction = useFetchWrapper();
  const { user } = useContext(userStateContext);

  const onCopyHandle = async () => {
    await navigator.clipboard.writeText(`https://sociiity.com/post/${postid}`);
    showFunction(false);
    showMessage("Url copied!");
  };

  const onDeleteHandle = async () => {
    try {
      const response = await fetchFunction({
        url: "/api/post/delete",
        method: "post",
        body: JSON.stringify({
          postid: postid,
        }),
      });

      if (response.ok) {
        showMessage("Post deleted!")
        showFunction(false);
      } else {
        showMessage("Could not delte post")

        showFunction(false);
      }
    } catch (error) {
      showMessage("Something went wrong")

      showFunction(false);
    }
  };

  useEffect(() => {
    otherThanEvent({
      onElement: overlay.current,
      onClickFunction: () => {
        showFunction(false);
      },
    });
  }, []);

  return (
    <>
      <div ref={overlay} className="overlay">
        <div className={`${style.postMenu} d-flex justify-content-center`}>
          <div className="d-flex flex-column align-items-center">
            {user.isLogin && user.user === postUser && (
              <div onClick={onDeleteHandle} className={`${style.option}`}>
                Delete
              </div>
            )}
            <div onClick={onCopyHandle} className={`${style.option}`}>
              Copy link
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
