import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

import SnowEffect from "../BackRound/snowEffect";
import Image from "next/image";

const ContactLeft = () => {
  const facebookLink = "https://www.facebook.com/thowfickofficial";
  const twitterLink = "https://twitter.com/thowfickofficia";
  const linkedinLink = "https://www.linkedin.com/in/thowfickofficial/";
  const instagrameLink = "https://www.instagram.com/thowfick_official/";
  const githubLink = "https://github.com/thowfickofficial";

  const handleFacebookClick = () => {
    window.open(facebookLink, "_blank");
  };

  const handleTwitterClick = () => {
    window.open(twitterLink, "_blank");
  };

  const handleLinkedInClick = () => {
    window.open(linkedinLink, "_blank");
  };
  const handleInstagramClick = () => {
    window.open(instagrameLink, "_blank");
  };
  const handleGithubClick = () => {
    window.open(githubLink, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:mdthowfickinfo@gmail.com";
  };

  // Define width and height based on screen size or your design requirements
  const width = 400; // Adjust this value as needed
  const height = 300; // Adjust this value as needed

  return (
    <div className=" relative mb-5 w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-4 lgl:p-8 rounded-lg shadow-shadowOne flex flex-col gap-8 justify-center">
      <div className="absolute inset-0 z-0">
        {/* SnowEffect is set to absolute position and takes the full size of the container */}
        <SnowEffect />
      </div>
      <Image
        loading="lazy"
        className="relative w-full h-64 object-fit rounded-lg mb-2"
        src="/images/contact/contactImg.jpg"
        alt="contactImg"
        width={width}
        height={height}
      />
      <div className=" relative flex flex-col gap-4">
        <h3 className="text-3xl font-bold text-white">Mohamed Thowfick</h3>
        <p className="text-lg font-normal text-gray-400">
          Penetration Tester | Full Stack Developer
        </p>
        <p
          className="text-base text-gray-400 flex items-center gap-2"
          onClick={handleEmailClick}
          style={{ cursor: "pointer" }}
        >
          Email:{" "}
          <span className="text-lightText">mdthowfickinfo@gmail.com</span>
        </p>
      </div>
      <div className="relative flex flex-col gap-4">
        <h2 className="text-base uppercase font-titleFont mb-4">Find me in</h2>
        <div className="flex gap-4">
          <span className="bannerIcon" onClick={handleFacebookClick}>
            <FaFacebookF />
          </span>
          <span className="bannerIcon" onClick={handleTwitterClick}>
            <FaTwitter />
          </span>
          <span className="bannerIcon" onClick={handleLinkedInClick}>
            <FaLinkedinIn />
          </span>
          <span className="bannerIcon" onClick={handleInstagramClick}>
            <FaInstagram />
          </span>
          <span className="bannerIcon" onClick={handleGithubClick}>
            <FaGithub />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactLeft;
