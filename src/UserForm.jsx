import { useState } from "react";

export default function UserForm({ onAddUser }) {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    schoolName: "",
    emis: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // auto format CNIC with dashes
    if (name === "cnic") {
      value = value.replace(/\D/g, "");
      if (value.length > 5 && value.length <= 12)
        value = value.slice(0, 5) + "-" + value.slice(5);
      if (value.length > 12)
        value = value.slice(0, 5) + "-" + value.slice(5, 12) + "-" + value.slice(12, 13);
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.fatherName || !form.cnic) return;
    onAddUser(form);
    setForm({ name: "", fatherName: "", cnic: "", schoolName: "", emis: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="fatherName"
        placeholder="Father Name"
        value={form.fatherName}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="cnic"
        placeholder="CNIC (xxxxx-xxxxxxx-x)"
        value={form.cnic}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="schoolName"
        placeholder="School Name"
        value={form.schoolName}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="emis"
        placeholder="School EMIS Code"
        value={form.emis}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add User
      </button>
    </form>
  );
}
