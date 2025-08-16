import React from "react";
import Banner from "./banner/Banner";
import Feature from "./feature/Feature";
import About from "./about/About";
import Feature_Classes from "./feature_classes/Feature_Classes";
import Testimonial from "./testimonial/Testimonial";
import NewsLetter from "./newsletter/NewsLetter";
import Team from "./team/Team";
import { Helmet } from "react-helmet";
import Forum_Post from "./latest_post/Forum_Post";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FitTrack | HomePage</title>
      </Helmet>
      <div>
        <Banner />
        <Feature />
        <About />
        <Feature_Classes />
        <Testimonial />
        <Forum_Post />
        <NewsLetter />
        <Team />
      </div>
    </>
  );
};

export default Home;
