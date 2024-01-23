import React from "react";
import Main from "../../hoc/layout/Main/Main";
import DropDown from "../../hoc/layout/Main/DropDown";
import { Link } from "react-router-dom";

export default function CgMain() {
  return (
    <>
      <Main>
        <h1>Community Guidelines</h1>
        <p className="py-3">
          We have made a set of rules to make our platform informative,
          objective and safe for everyone.
        </p>
        <h2>What type of content is not allowed?</h2>
        <h3>False Claims</h3>
        <p>
          If you make any claim against anyone without any solid evidence. The
          alleged victim can submit a request to investigate your post. If our
          team find your post false or misleading, we will take strict legal
          action, including the removal of your account and post.
        </p>

        <h3>Sexual Content</h3>
        <p>
          Keep it clean! Our platform isn't for anything NSFW (Not Safe For
          Work). No nudity, no graphic content, and keep things appropriate for
          everyone.
        </p>

        <h3>Personal Opinions</h3>
        <p>
          While everyone has a viewpoint, our platform is all about reporting
          the facts. Stick to sharing what you see and hear, not what you think
          or feel.
        </p>

        <h3>Hate Speech</h3>
        <p>
          We believe in treating everyone with respect, and that means no hate
          speech of any kind. No put-downs, insults, or discrimination based on
          someone's background, beliefs, or anything else. Be cool, be kind.
        </p>

        <h3>Promotional Content</h3>
        <p>
          We get it, you want to share your stuff! But let's keep things focused
          on reporting wrongdoings in our community. No self-promotion,
          spamming, or advertising.
        </p>

        <h3>Spam</h3>
        <p>
          Don't be that robot posting the same thing over and over! We like
          unique, fresh stuff. Keep your posts relevant and avoid repetitive or
          unnecessary content.
        </p>

        <h3>Adult Content</h3>
        <p>
          This isn't the place for grown-up stuff. Aavoid anything that would
          make your grandma raise an eyebrow.
        </p>

        <h3>Discriminatory Language</h3>
        <p>
          Words can hurt. No hurtful language based on someone's race, religion,
          sexual orientation, or anything else. Let's create a welcoming space
          for everyone.
        </p>

        <h3>Off-Topic</h3>
        <p>
          Stay on point! Posts should be related to reporting wrongdoings. This
          isn't the place for cat videos or vacation selfies.
        </p>

        <h3>Inappropriate Language</h3>
        <p>
          Keep it clean! No cursing, swearing, or anything that would make your
          mom blush. Let's keep the vibe friendly and respectful.
        </p>

        <h3>Posts Must Fit Our Categories</h3>
        <p>
          Your posts should align with our predefined{" "}
          <Link to={"/categories"}>categories</Link>. Please avoid from
          posting content that doesn't match these categories.
        </p>

        <DropDown
          question={"What if someone dont follow our guidelines?"}
          ansewr={`If our team finds anyone, violating our community guidelines. We will remove thier account.`}
        />
      </Main>
    </>
  );
}
