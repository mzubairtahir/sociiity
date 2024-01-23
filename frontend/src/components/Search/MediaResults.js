import React, {  useEffect, useState } from "react";
import style from "./styles/Results.module.css";
import FeedCommon from "../Feed/FeedCommon";


export default function MediaResults({q, cityFilter}) { 
  const [foundNoResultMsg, setFoundNoResultMsg] = useState(false);

  useEffect(()=>{
    setFoundNoResultMsg(false)

  },[q])






  return (
    <>
      <div className={`${style.mediaResults}`}>
       {!foundNoResultMsg? <FeedCommon postsShowTitle={""} fetchingLink={`/api/search/posts?q=${q}${cityFilter !== null ? `&fl=${cityFilter}` : ''}`} onzeropostsfunc={()=>setFoundNoResultMsg(true)}/>:
       <>
       <div className="text-center font-weight-bold">
        No results found for your query.	
       </div>
       </>}

      </div>
    </>
  );
}
