import React, { useState } from "react";
import Select from "react-select";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";

// Dummy trainer info (fetched from trainer application form)
const trainerInfo = {
  fullName: "Abul Hasan",
  email: "abul@example.com",
  skills: ["Yoga", "Pilates"],
  availableDays: ["Sun", "Mon", "Wed"],
};

// Dummy classes fetched from admin
const classOptions = [
  { value: "Yoga", label: "Yoga" },
  { value: "Zumba", label: "Zumba" },
  { value: "Cardio", label: "Cardio" },
  { value: "Strength Training", label: "Strength Training" },
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

const AddNewSlot = () => {
  const { user } = UseAuth();
  const useAxiso = UseAxios();
  const {
    data: trainer = {},
    isLoading,
    error,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["trainer", user?.email],
    queryFn: async () => {
      const res = await useAxiso.get(`/beatriner/${user.email}`);
      return res.data;
    },
  });
  console.log("user", user);
  console.log("trainer", trainer);
  const [form, setForm] = useState({
    slotName: "",
    slotTime: "",
    selectedDays: dayOptions.filter((day) =>
      trainerInfo.availableDays.includes(day.value)
    ),
    selectedClass: null,
    otherInfo: "",
  });

  const [submittedSlots, setSubmittedSlots] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSlot = {
      id: submittedSlots.length + 1,
      trainer: trainerInfo,
      slotName: form.slotName,
      slotTime: form.slotTime,
      days: form.selectedDays.map((d) => d.value),
      class: form.selectedClass?.value,
      otherInfo: form.otherInfo,
    };

    setSubmittedSlots([newSlot, ...submittedSlots]);
    alert("Slot added successfully!");
    setForm({
      slotName: "",
      slotTime: "",
      selectedDays: form.selectedDays,
      selectedClass: null,
      otherInfo: "",
    });
  };

  if (isLoading) {
    return <h2>Loaing....</h2>;
  }
  if (error) {
    return <p className="text-red">{error.message}</p>;
  }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Slot</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only Trainer Info */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            value={user?.displayName}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            value={user?.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Skills</label>
          <input
            value={trainerInfo.skills.join(", ")}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Slot Name */}
        <div>
          <label className="block font-medium">Slot Name</label>
          <input
            type="text"
            value={form.slotName}
            onChange={(e) => setForm({ ...form, slotName: e.target.value })}
            placeholder="e.g., Morning Slot"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block font-medium">Slot Time</label>
          <input
            type="text"
            value={form.slotTime}
            onChange={(e) => setForm({ ...form, slotTime: e.target.value })}
            placeholder="e.g., 1 hour"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Available Days (React Select) */}
        <div>
          <label className="block font-medium">Available Days</label>
          <Select
            isMulti
            isDisabled
            value={form.selectedDays}
            options={dayOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Select Class */}
        <div>
          <label className="block font-medium">Select a Class</label>
          <Select
            value={form.selectedClass}
            onChange={(selected) =>
              setForm({ ...form, selectedClass: selected })
            }
            options={classOptions}
            placeholder="Choose a class"
          />
        </div>

        {/* Other Info */}
        <div>
          <label className="block font-medium">Other Info (optional)</label>
          <textarea
            value={form.otherInfo}
            onChange={(e) => setForm({ ...form, otherInfo: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Any additional information..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Slot
        </button>
      </form>

      {/* List of added slots (client-side only) */}
      {submittedSlots.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">
            Submitted Slots (dummy)
          </h3>
          <ul className="space-y-2">
            {submittedSlots.map((slot) => (
              <li key={slot.id} className="border p-4 rounded">
                <p>
                  <strong>Slot:</strong> {slot.slotName}
                </p>
                <p>
                  <strong>Time:</strong> {slot.slotTime}
                </p>
                <p>
                  <strong>Days:</strong> {slot.days.join(", ")}
                </p>
                <p>
                  <strong>Class:</strong> {slot.class}
                </p>
                <p>
                  <strong>Other Info:</strong> {slot.otherInfo}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddNewSlot;
