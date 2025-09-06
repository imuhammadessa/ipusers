import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

import UserForm from "./UserForm";
import UserList from "./UserList";
import ExportButton from "./ExportButton";
import logo from "./assets/logo.png";

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Load users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc, i) => ({
        id: i + 1, // sequential IDs
        docId: doc.id, // Firestore doc ID
        ...doc.data(),
      }));
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const addUser = async (user) => {
    const exists = users.some((u) => u.cnic === user.cnic);
    if (exists) {
      setError("⚠️ CNIC already exists!");
      return;
    }

    await addDoc(collection(db, "users"), user);
    setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
    setError("");
  };

  const editUser = async (index, updatedUser) => {
    const user = users[index];
    if (user?.docId) {
      await updateDoc(doc(db, "users", user.docId), updatedUser);
    }
    const updated = [...users];
    updated[index] = { ...updatedUser, id: index + 1, docId: user.docId };
    setUsers(updated);
  };

  const deleteUser = async (index) => {
    const user = users[index];
    if (user?.docId) {
      await deleteDoc(doc(db, "users", user.docId));
    }
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated.map((u, i) => ({ ...u, id: i + 1 })));
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
