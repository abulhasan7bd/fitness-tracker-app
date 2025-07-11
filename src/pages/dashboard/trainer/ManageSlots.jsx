import React, { useState } from "react";

const dummySlots = [
  {
    id: 1,
    slotName: "Morning Slot",
    time: "8:00 AM - 9:00 AM",
    class: "Yoga",
    day: "Monday",
    bookedBy: "user1@example.com",
  },
  {
    id: 2,
    slotName: "Evening Slot",
    time: "6:00 PM - 7:00 PM",
    class: "Zumba",
    day: "Wednesday",
    bookedBy: null,
  }
];

const ManageSlots = () => {
  const [slots, setSlots] = useState(dummySlots);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this slot?");
    if (confirm) {
      setSlots(slots.filter(slot => slot.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Slots</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Slot Name</th>
            <th>Time</th>
            <th>Day</th>
            <th>Class</th>
            <th>Booked By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id} className="text-center border-t">
              <td>{slot.slotName}</td>
              <td>{slot.time}</td>
              <td>{slot.day}</td>
              <td>{slot.class}</td>
              <td>{slot.bookedBy || "Not Booked"}</td>
              <td>
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;
