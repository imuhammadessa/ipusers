import { useState } from "react";

export default function UserList({ users, onDelete, onEdit }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleSave = (index) => {
    onEdit(index, editData);
    setEditIndex(null);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">
        Saved Users <span className="text-gray-500">({users.length})</span>
      </h2>

      {/* Responsive Scroll Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm bg-white text-sm sm:text-base">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Father Name</th>
              <th className="p-2 border">CNIC</th>
              <th className="p-2 border">School Name</th>
              <th className="p-2 border">School EMIS</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{u.id}</td>
                {editIndex === i ? (
                  <>
                    <td className="p-2 border">
                      <input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        value={editData.fatherName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            fatherName: e.target.value,
                          })
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        value={editData.cnic}
                        onChange={(e) =>
                          setEditData({ ...editData, cnic: e.target.value })
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        value={editData.schoolName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            schoolName: e.target.value,
                          })
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        value={editData.emis}
                        onChange={(e) =>
                          setEditData({ ...editData, emis: e.target.value })
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="p-2 border text-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleSave(i)}
                        className="px-3 py-1 bg-green-500 text-white rounded w-full sm:w-auto"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.fatherName}</td>
                    <td className="p-2 border">{u.cnic}</td>
                    <td className="p-2 border">{u.schoolName}</td>
                    <td className="p-2 border">{u.emis}</td>
                    <td className="p-2 border text-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => {
                          setEditIndex(i);
                          setEditData(u);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(i)}
                        className="px-3 py-1 bg-red-500 text-white rounded w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
