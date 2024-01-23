import React, { useContext, useState } from "react";
import PostMenu from "./PostMenu";
import style from "../styles/Post.module.css";
import SingleFile from "./post_media/SingleFile";
import MultiFile from "./post_media/MultiFile";
import Location from "./Location";
import userStateContext from "../../../states/userStateContext";
import PostFooter from "./PostFooter";
import TextContent from "./TextContent";
import Category from "./Category";

export default function Post(props) {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const { user } = useContext(userStateContext);

  function setShowPostMenuTrigger(value) {
    setShowPostMenu(value);
  }

  return (
    <>
      <div className={`${style.post} secondary-dark-colour-bg lite-white-text`}>
        <div className="upper-portion px-3">
          <div className="post-header  d-flex py-2">
            <div className="user-picture-wrapper">
              <img
                className={`${style.profilePic} rounded-circle`}
                src={props.data.user.profile_picture}
                alt="test"
              />
            </div>
            <div
              className={`${style.usrenameAndTimeWrapper} d-flex flex-column`}
            >
              <div className="d-flex">
                <h4 className={`${style.username}`}>
                  {props.data.user.full_name}
                </h4>
              </div>

              <span className={`${style.postTime}`}>{props.data.time}</span>
            </div>
            {
              <div className="post-menu-button px-2 cursor-pointer">
                <svg
                  onClick={() => setShowPostMenuTrigger(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                </svg>
              </div>
            }
            {showPostMenu && (
              <PostMenu
                postid={props.data.id}
                showFunction={setShowPostMenuTrigger}
                postUser={props.data.user.id}
              />
            )}
          </div>
          <div className="d-flex">
            <Location locationName={props.data.city.name} />
            <Category value={props.data.category}/>
          </div>
          <TextContent text_content={props.data.text_content} />
        </div>
        <div className={`${style.postMedia}`}>
          {props.data.media.length === 1 ? (
            <SingleFile mediaDataDict={props.data.media[0]} />
          ) : props.data.media.length ===0 ? (
            <></>
          ) : (
            <>
              <MultiFile mediaList={props.data.media} />
            </>
          )}
        </div>

        {user.isLogin && <PostFooter props={props} />}
      </div>
    </>
  );
}
