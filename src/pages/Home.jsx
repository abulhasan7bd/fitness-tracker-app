import React from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import Header from "../components/heders/Headder";
import Loading from "./Loading";
import RoommateCard from "./RoommateCard";
import { Fade } from "react-awesome-reveal";
import UserFeedback from "./UserFeedback";
 import OptimizationBox from "./OptimizationBox";
import HowItWorks from "./HowItWorks";
const Home = () => {
  const loderData = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Featured Roommate Posts */}
      <section className="p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Featured Roommates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loderData.slice(0, 6).map((roommate,id) => (
            <Fade cascadedelay={200} duration={1000} fraction={0.5}>
              <RoommateCard roommate={roommate} key={id}/>
            </Fade>
          ))}
        </div>
      </section>

      <UserFeedback/>
     {/* <OptimizationBox/> */}
     <HowItWorks/>
    </div>
  );
};

export default Home;
