import React from "react";
import ed from "./assets/Screenshot 2023-12-21 082752.jpg";

import Main from "../../hoc/layout/Main/Main";
import { Link } from "react-router-dom";

export default function HmpMain() {
  return (
    <Main>
      <h1>How to make post?</h1>
      <p>
        Creating a post is simple with just a few easy steps. Please follow the
        instructions below:
      </p>
      <p class="highlighNote">
        <span class="font-weight-bold">Note:</span> Ensure that your post
        follows our{" "}
        <Link to={"/community-guidelines"}>community guidelines</Link>.
      </p>
      <h2>1. Add Post Description or Title</h2>
      <p>Begin by providing a meaningful description or title for your post.</p>
      <p>
        Share details about the content and context of your post, or simply
        provide a title if you prefer not to include a description.
      </p>

      {/* <img src={ed} alt="" className="mainImage" /> */}
      <h2>2. Include Location</h2>
      <p>
        Next, specify the location relevant to the news you're sharing. Simply
        click on the location button and search for your city.
      </p>
      <p>
        We've already included most cities in Pakistan, and we will continue to
        add the remaining ones in the upcoming days.
      </p>

      <h2>3. Upload Media</h2>
      <p>
        Now, enhance your post by adding media. You can upload both videos and
        images, with a maximum limit of three media files.
      </p>
      <p>
        <span class="font-weight-bold">Video:</span> Upload videos in .mp4
        format, with a maximum duration of 10 minutes.
      </p>
      <p>
        <span class="font-weight-bold">Images:</span> We support .png, .jpg, or
        .jpeg formats for post images.
      </p>

      <h2>4. Choose a Category</h2>
      <p>
        Our content is organized into specific categories for better
        organization. You are required to submit your content under a relevant
        category.
      </p>
      <p>
        You can review the available
        <Link to={"/categories"}> categories here</Link>.
      </p>
      <p>
        To assign a category to your post, click on the category dropdown
        located under the media button, and select the most fitting category
        based on your post's content.
      </p>

      <h2>5. Submit Your Post</h2>
      <p>
        The "Post" button will remain disabled until you have provided all
        necessary details, including description, media, location and category.
      </p>
      <p>
        Once you have completed these steps, click the "Post" button to upload
        the post.
      </p>
      <p className="highlighNote">
        Note: Violations of our{" "}
        <Link to={"/community-guidelines"}>community guidelines</Link>. may
        result in the removal of your account and the associated post by our
        systems and team.
      </p>
    </Main>
  );
}
