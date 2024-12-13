import React from "react";
import video from "@assets/Harry_Potter_Magic_Awakened.mp4";

const VideoBg = () => {
  return (
    <video id="background-video" autoPlay loop muted>
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default VideoBg;
