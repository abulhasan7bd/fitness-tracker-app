import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UseAxios from "../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const DataDetail = () => {
  const location = useLocation();
  const { classItem } = location.state || {};
  const axiosInstance = UseAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["data", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/single-trainer/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleSlotClick = (slot) => {
    navigate(`/booking/${id}`, { state: { data, slot, classItem } });
  };
  if (isLoading) return <h2 className="text-center mt-10">Loading.....</h2>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        Error: {error.message || "Something went wrong"}
      </p>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#dfede0] py-12">
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trainer Info */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={data.profileImage}
              alt={data.fullName}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{data.fullName}</h2>
              <p className="text-gray-600">Age: {data.age}</p>
              <p className="text-gray-600 mt-1">
                🎓 {data.university}, Class of {data.passingYear}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{data.bio}</p>

          <h3 className="font-semibold mb-2">Skills:</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <div className="text-sm text-gray-500">
            <p>
              <span className="font-medium text-gray-700">Status:</span>{" "}
              {data.status}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {data.email}
            </p>
          </div>
        </div>

        {/* Right Side: Available Slots & Work Experience */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-6">
          {/* Available Slots */}
          <div>
            <h3 className="text-xl font-bold mb-4">Available Slots</h3>
            <p className="text-gray-700 mb-2">⏰ {data.availableTime}</p>
            <div className="flex flex-wrap gap-3">
              {data.availableDays.map((slot, index) => (
                <span
                  key={index}
                  className="bg-[#301e4e] text-white px-4 py-2 rounded-2xl cursor-default"
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xl font-bold mb-4">Work Experience</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Company:</span> {data.company}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Duration:</span> {data.duration}{" "}
              years
            </p>
            <p className="mt-3 italic text-gray-600 border-l-4 border-[#ef4444] pl-4">
              "{data.feedback}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataDetail;
