import React, { useState } from "react";

const initialClasses = [
  {
    id: "class1",
    title: "Yoga",
    image: "https://i.pravatar.cc/150?img=1",
    details: "Relax and stretch with guided yoga sessions.",
  },
  {
    id: "class2",
    title: "Zumba",
    image: "https://i.pravatar.cc/150?img=2",
    details: "Dance your way to fitness with fun Zumba workouts.",
  },
];

const Add_a_New_class = () => {
  const [classes, setClasses] = useState(initialClasses);

  const [form, setForm] = useState({
    title: "",
    image: "",
    details: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.image || !form.details) {
      alert("Please fill all fields");
      return;
    }

    const newClass = {
      id: `class${classes.length + 1}`,
      title: form.title,
      image: form.image,
      details: form.details,
    };

    setClasses([newClass, ...classes]);
    setForm({ title: "", image: "", details: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Class (Dummy Data)</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1 font-medium">Class Name</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter class name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter class details"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Class
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">All Classes</h3>
      <ul>
        {classes.map((cls) => (
          <li
            key={cls.id}
            className="mb-4 p-4 border rounded flex items-center gap-4"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h4 className="font-bold">{cls.title}</h4>
              <p>{cls.details}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Add_a_New_class;
