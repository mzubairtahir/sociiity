import React from "react";
import Hero from "./Hero";
import Row from "./Row/Row";
import row1 from "./assets/row1.jpeg";
import picture2 from "./assets/picture2.png";
import citizenjournalism from "./assets/citizenreporting.jpeg";
import logo from "./assets/herologo.png";
import socialmedia from "./assets/socialmedias.jpg";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <Row  
        text={`Many bad things happen to ordinary people every day, and they often feel powerless. But when these incidents are shared on social media, many people see them, and it makes the authorities pay attention. This pressure makes them look into the issue and solve it quickly. If bad actions are made public, they are more likely to be fixed, and fewer bad things might happen because people will be afraid of being exposed.`}
        picture={row1}
        heading={"Social sharing can reduce wrongdoings or crimes"}
        title="Context"
      />

      <Row
        text={`Lots of crimes gets posted on existing big social media sites, but alot of them goes unseen because of lack of enough followers. It's like shouting in a very large crowd - your voice gets lost. These platforms reach tons of people around the world, but that also means it's super crowded and hard for everyday folks to be heard. You need a lot of followers just to get attention, which makes it tough to speak up.`}
        picture={socialmedia}
        heading={"Everyone cant speak up there"}
        type="right"
        color="dark"
        title="Problem with existing social media apps"
      />

      <Row
        text={`We need to give power to regular people so that if they see something wrong, they can quickly share it with others.`}
        picture={picture2}
        heading={" Make it easy for everyone to speak up about bad things."}
        title="Solution"
      />
      <Row
        text={`Sociiity brings this solution. We enable everyone to share any wrongdoing directly with their city. By operating at the city level, we keep competition low, making it easy for users to speak up and share things with others. Our goal is to ensure that everyone's voice is heard.`}
        picture={logo}
        heading={
          "We Empower Everyone to Share wrongdoings in their city easily"
        }
        type="right"
        color="dark"
        title="Sociiity: Bringing the Solution"
      />

      <Row
        text={`<ul>
        <li>
        Users will capture evidence (photos or videos) and upload it along with a detailed description of the incident on Sociiity.com.
        </li>
        <li>
        If someone is breaking the law nearby, not doing their duty correctly, accepting bribes, or involved in fraudulent activities, simply capture it and upload the evidence. (See all <a href="/categories">categories here</a>.)
        </li>
        <li>
        Your posts will be visible to your entire city and users from other cities if they search for posts of similar types.
        </li>
      </ul>`}
        picture={citizenjournalism}
        heading={"The process is simple"}
        title="How Users Can Report on Sociiity?"
      />


      <Footer />
    </>
  );
}
