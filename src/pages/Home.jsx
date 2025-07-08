import React from "react";
import Banner from "./banner/Banner";
import Feature from "./feature/Feature";
import About from "./about/About";
import Feature_Classes from "./feature_classes/Feature_Classes";
import Testimonial from "./testimonial/Testimonial";
import Latest_Post from "./latest_post/Latest_Post";
import NewsLetter from "./newsletter/NewsLetter";
import Team from "./team/Team";

const Home = () => {
  return (
    <div>
      <Banner />
      <Feature />
      <About />
      <Feature_Classes />
      <Testimonial />
      <Latest_Post />
      <NewsLetter />
      <Team/>
    </div>
  );
};

export default Home;
