// import React, { useState } from "react";
// import UseAuth from "../../../hooks/UseAuth";

// const AddForum = () => {
//   const { user } = UseAuth();
//   console.log(user);
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Forum post added (dummy)");
//     console.log(form);
//     setForm({ title: "", content: "" });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Add New Forumx</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <textarea
//           placeholder="Content"
//           value={form.content}
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Post Forum
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddForum;
