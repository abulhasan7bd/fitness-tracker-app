import React from "react";
import { useForm } from "react-hook-form";
import UseAxios from "./../../../hooks/UseAxios";
import UseAuth from "./../../../hooks/UseAuth";
import Swal from "sweetalert2";
const fitnessCategories = [
  "Yoga Basics",
  "HIIT Training",
  "Pilates Core",
  "Zumba Dance",
  "Strength Training",
  "Cardio Kickboxing",
];

const AddAClass = () => {
  const useAxiso = UseAxios();
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // class data
    const classData = {
      ...data,
      bookingCount: 0,
      createdAt: new Date(),
      trainers: [
        {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
      ],
    };

    useAxiso
      .post("/classes", classData)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Class added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to add class: ${error.message}`,
        });
      });
  };

  return (
  <div className="max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
    Add a New Class
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    {/* Category */}
    <div>
      <label className="block font-medium mb-1 text-sm sm:text-base">
        Select Category
      </label>
      <select
        {...register("category", { required: true })}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Choose a category --</option>
        {fitnessCategories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="text-red-600 text-sm mt-1">Category is required</p>
      )}
    </div>

    {/* Details */}
    <div>
      <label className="block font-medium mb-1 text-sm sm:text-base">
        Details
      </label>
      <textarea
        {...register("details", { required: true })}
        className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter class details"
        rows={4}
      />
      {errors.details && (
        <p className="text-red-600 text-sm mt-1">Details are required</p>
      )}
    </div>

    {/* Image URL */}
    <div>
      <label className="block font-medium mb-1 text-sm sm:text-base">
        Image URL
      </label>
      <input
        type="text"
        {...register("image", { required: true })}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter image URL"
      />
      {errors.image && (
        <p className="text-red-600 text-sm mt-1">Image URL is required</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-blue-600 text-white w-full py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300"
    >
      Submit Class
    </button>
  </form>
</div>

  );
};

export default AddAClass;
