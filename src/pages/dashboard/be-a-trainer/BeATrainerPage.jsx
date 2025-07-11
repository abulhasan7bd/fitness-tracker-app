import React, { use } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";

const BeATrainerPage = () => {
  const { user } = UseAuth();
  const skillsList = [
    "Yoga",
    "Cardio",
    "Strength Training",
    "Zumba",
    "CrossFit",
  ];
  const availableDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      email: user.email,
      status: "pending",
    };
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Be a Trainer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: true })}
            className="w-full p-3 border rounded-lg"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">Full Name is required.</p>
          )}
        </div>

        {/* Email - Read Only */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: true, min: 18 })}
            className="w-full p-3 border rounded-lg"
            placeholder="Your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">Age is required (18+).</p>
          )}
        </div>

        {/* Profile Image URL */}
        <div>
          <label className="block font-medium">Profile Image URL</label>
          <input
            type="url"
            {...register("profileImage", { required: true })}
            className="w-full p-3 border rounded-lg"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium mb-2">Skills</label>
          <div className="flex flex-wrap gap-4">
            {skillsList.map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input type="checkbox" value={skill} {...register("skills")} />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="block font-medium mb-2">Available Days</label>
          <div className="flex flex-wrap gap-4">
            {availableDays.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={day}
                  {...register("availableDays")}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* Available Time */}
        <div>
          <label className="block font-medium">Available Time</label>
          <input
            type="text"
            {...register("availableTime", { required: true })}
            className="w-full p-3 border rounded-lg"
            placeholder="Ex: 9AM - 12PM, 4PM - 6PM"
          />
        </div>

        {/* Other Info */}
        <div>
          <label className="block font-medium">Other Info</label>
          <textarea
            {...register("otherInfo")}
            className="w-full p-3 border rounded-lg"
            placeholder="Tell us anything else you'd like us to know..."
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeATrainerPage;
