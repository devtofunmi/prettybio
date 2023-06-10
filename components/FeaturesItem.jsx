import React from "react";
import image from "../public/assets/one.png";
import Image from 'next/image';

const FeaturesItem = [
  {
    image: <Image src={"/assets/claim.png"} alt="features image"   width={500}
              height={500}/>,
    heading: "Claim your bio",
    subheading:
      "Take the first step towards building a professional online presence by choosing a unique and memorable username. Then, publish your page and share it with the world to showcase your skills, achievements, and interests.",
    isInverted: false,
  },
  {
    image: <Image src={"/assets/links.png"} alt="features image"  width={500}
              height={500} />,
    heading: "All your links in one place",
    subheading:
      "Build a professional online presence by adding your social media and website links to your bio page. Your bio page serves as your new online home, showcasing your skills, achievements, and interests to the world.",
    isInverted: true,
  },
  {
    image: <Image src={"/assets/world.png"} alt="features image"  width={500}
              height={500} />,
    heading: "Use it anywhere ",
    subheading:
      "Maximize your professional online presence by using your bio link on your social media profiles, emails, and other places where people follow you. Your bio page serves as a central hub for showcasing your skills, achievements, and interests to the world.",
    isInverted: false,
  },
  {
    image: <Image src={"/assets/analytic.png"} alt="features image"  width={450}
              height={450} />,
    heading: "Analytics",
    subheading:
      "Enhance your professional online presence by tracking the number of clicks on your links and viewing your page views. This will help you to understand the effectiveness of your content and optimize your page for success.",
    isInverted: true,
  },
];

export default FeaturesItem;
