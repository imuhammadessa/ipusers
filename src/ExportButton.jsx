export default function ExportButton({ users }) {
  const downloadCSV = () => {
    const headers = ["ID", "Name", "Father Name", "CNIC", "School Name", "School EMIS"];
    const rows = users.map((u) =>
      [u.id, u.name, u.fatherName, u.cnic, u.schoolName, u.emis].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Export CSV
    </button>
  );
}
