import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import Header from "../components/heders/Headder";
import Loading from "./Loading";
import RoommateCard from "./RoommateCard";
import { Fade } from "react-awesome-reveal";
import UserFeedback from "./UserFeedback";
import HowItWorks from "./HowItWorks";
const Home = () => {
  const loderData = useLoaderData();
  const navigation = useNavigation();
  const [originalData] = useState(loderData);
  const [displayData, setDisplayData] = useState(loderData);
  const [getLocation, setLoaction] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (value) {
      const res = originalData.filter(
        (item) => item.location.toLowerCase() === value.toLowerCase()
      );
      setDisplayData(res);
    } else {
      setDisplayData(originalData);
    }
  }, [value]);

  useEffect(() => {
    let location = loderData.map((item) => {
      return item.location.toLowerCase();
    });
    let unikVlaue = new Set(location);
    setLoaction([...unikVlaue]);
  }, []);


  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="dark:bg-black dark:text-white min-h-screen flex flex-col">
      <Header setValue={setValue} />
      {/* Featured Roommate Posts */}
      <section className="p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold mb-6">Featured Roommates</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayData.length === 0 && (
            <div className="w-full h-[60vh] bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center text-center px-4 col-span-full">
              <h2 className="text-2xl font-bold text-red-600 mb-6">
                Sorry! Your location has no data added yet.
              </h2>
              <div className="bg-white p-6 rounded-xl shadow-md w-full text-left">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Our Available Locations:
                </p>
                <ul className="   text-gray-600 space-y-2 flex flex-wrap gap-[1rem]">
                  {getLocation.map((item, id) => {
                    return (
                      <li
                        key={id}
                        className="text-green-300 capitalize bg-black dark:bg-gray-900 px-6 py-2 rounded"
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {displayData.slice(0, 6).map((roommate, id) => (
            <Fade key={id} cascade delay={200} duration={1000} fraction={0.5}>
              <RoommateCard roommate={roommate} />
            </Fade>
          ))}
        </div>
      </section>

      <UserFeedback />
      <HowItWorks />
    </div>
  );
};

export default Home;
