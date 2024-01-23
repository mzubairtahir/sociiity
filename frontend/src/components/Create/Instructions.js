import React, { useState } from "react";

export default function Instructions() {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <p>
        We strongly recommend referring to our{" "}
        <a href="https://docs.sociiity.com/how-make-post">
          post-making documentation
        </a>{" "}
        to understand the process and avoid any content violations.
      </p>
    </>
  );
}
