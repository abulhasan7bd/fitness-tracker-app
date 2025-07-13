import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "./../../../hooks/UseAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const skillOptions = [
  "Cardio",
  "Yoga",
  "Strength",
  "CrossFit",
  "Pilates",
  "Zumba",
];
const dayOptions = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

const Be_a_Trainer = () => {
  const { user } = UseAuth();
  const useAxios = UseAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Handle checkbox for skills
  const toggleSkill = (skill) => {
    const currentSkills = getValues("skills") || [];
    if (currentSkills.includes(skill)) {
      setValue(
        "skills",
        currentSkills.filter((s) => s !== skill)
      );
    } else {
      setValue("skills", [...currentSkills, skill]);
    }
  };

  // Handle react-select multi-select
  const handleDaysChange = (selected) => {
    const values = selected ? selected.map((d) => d.value) : [];
    setValue("availableDays", values);
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      email: user?.email,
      status: "pending",
    };

    // server save Be a Trainer
    useAxios

      .post("/beatrainer", finalData)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Thank You!",
            text: "Your trainer application has been submitted successfully. Our team will review it and notify you soon.",
            confirmButtonColor: "#10B981",
          }).then((res) => {
            console.log(res);
            if (res.isConfirmed) {
              navigate("/");
            }
          });
        }
        console.log("Be a Trainer Data Save in the Database", res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Be a Trainer</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Full Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 text-gray-600"
        />

        {/* Age */}
        <div>
          <input
            type="number"
            placeholder="Age"
            {...register("age", { required: "Age is required" })}
            className="input input-bordered w-full"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Profile Image */}
        <input
          type="url"
          placeholder="Profile Image URL"
          {...register("profileImage")}
          className="input input-bordered w-full"
        />

        {/* profiel bio  */}
        <div className="md:col-span-2">
          <label htmlFor="bio" className="block font-semibold mb-2">
            Bio:
          </label>
          <textarea
            id="bio"
            {...register("bio", {
              required: "Bio is required",
              minLength: {
                value: 30,
                message: "Bio should be at least 30 characters long",
              },
            })}
            rows={4}
            placeholder="Write a short bio about yourself..."
            className="textarea textarea-bordered w-full resize-none"
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* university Nmae and passing year  */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* University Name */}
          <div>
            <label htmlFor="university" className="block font-semibold mb-1">
              University Name:
            </label>
            <input
              id="university"
              type="text"
              placeholder="Your University Name..."
              {...register("university", {
                required: "University name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.university && (
              <p className="text-red-500 text-sm">
                {errors.university.message}
              </p>
            )}
          </div>

          {/* Passing Year */}
          <div>
            <label htmlFor="passingYear" className="block font-semibold mb-1">
              Passing Year:
            </label>
            <input
              id="passingYear"
              type="number"
              placeholder="2015"
              {...register("passingYear", {
                required: "Passing year is required",
                min: {
                  value: 1900,
                  message: "Year must be 1900 or later",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Year cannot be in the future",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.passingYear && (
              <p className="text-red-500 text-sm">
                {errors.passingYear.message}
              </p>
            )}
          </div>
        </div>

        {/* Skills Checkboxes */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-2">Skills:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input type="checkbox" onChange={() => toggleSkill(skill)} />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-2">Available Days:</label>
          <Select
            options={dayOptions}
            isMulti
            onChange={handleDaysChange}
            closeMenuOnSelect={false}
          />
        </div>

        {/* Available Time */}
        <input
          type="text"
          placeholder="Available Time (e.g., 9 AM - 5 PM)"
          {...register("availableTime")}
          className="input input-bordered w-full"
        />

        {/* Other Info */}
        <textarea
          placeholder="Other Info (Optional)"
          {...register("otherInfo")}
          className="textarea textarea-bordered w-full md:col-span-2"
        ></textarea>

        {/* work experience  */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold mb-4">Work Experience</h3>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block font-semibold mb-1">
              Company:
            </label>
            <input
              id="company"
              type="text"
              placeholder="FitLife Gym"
              {...register("company", { required: "Company name is required" })}
              className="input input-bordered w-full"
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block font-semibold mb-1">
              Duration (e.g., 3 years):
            </label>
            <input
              id="duration"
              type="text"
              placeholder="3 years"
              {...register("duration", { required: "Duration is required" })}
              className="input input-bordered w-full"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>

          {/* Testimonial / Feedback */}
          <div>
            <label htmlFor="feedback" className="block font-semibold mb-1">
              Feedback :
            </label>
            <textarea
              id="feedback"
              rows={4}
              placeholder="John’s dedication and personalized training approach..."
              {...register("feedback")}
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full md:col-span-2">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Be_a_Trainer;
