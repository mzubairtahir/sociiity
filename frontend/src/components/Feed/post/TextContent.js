import React, { useEffect, useState } from "react";

export default function TextContent({ text_content = "" }) {
  const [text, setText] = useState("");

  const textToogle = () => {
    if (text.length <= 150) {
      setText(text_content);
    } else {
      setText(text_content.slice(0, 150));
    }
  };

  useEffect(() => {
    setText(text_content.slice(0, 150));
  }, []);

  useEffect(() => {}, [text]);

  return (
    <>
      <div className="post-content py-2">
        <span style={{ whiteSpace: "pre-line" }}>{text}</span>
        {text_content.length > 150 && (
          <span
            onClick={textToogle}
            className="font-weight-bold"
            style={{ cursor: "pointer" }}
          >
            <span>...</span>
            {text.length <= 150 ? "See more" : "See less"}
          </span>
        )}
      </div>
    </>
  );
}
