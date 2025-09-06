import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import ExportButton from "./ExportButton";
import logo from "./assets/logo.png";

const STORAGE_KEY = "users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Load users from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    const exists = users.some((u) => u.cnic === user.cnic);
    if (exists) {
      setError("⚠️ CNIC already exists!");
      return;
    }

    const newUsers = [...users, user].map((u, i) => ({
      ...u,
      id: i + 1, // IDs always start from 1
    }));

    setUsers(newUsers);
    setError("");
  };

  const editUser = (index, updatedUser) => {
    const updated = [...users];
    updated[index] = updatedUser;

    const remapped = updated.map((u, i) => ({
      ...u,
      id: i + 1,
    }));

    setUsers(remapped);
  };

  const deleteUser = (index) => {
    const updated = [...users];
    updated.splice(index, 1);

    const remapped = updated.map((u, i) => ({
      ...u,
      id: i + 1,
    }));

    setUsers(remapped);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Logo + Title */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="App Logo" className="w-20 h-20 mb-3" />
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          User Data Collection
        </h1>
        <p className="text-gray-500 text-sm">Save, manage & export with ease</p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl">
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}
        <UserForm onAddUser={addUser} />
        <UserList users={users} onDelete={deleteUser} onEdit={editUser} />
        {users.length > 0 && <ExportButton users={users} />}
      </div>
    </div>
  );
}
