import { useState, useEffect } from "react";
import "./App.css";

type Application = {
  id: number;
  company: string;
  position: string;
  status: string;
  created_at?: string;
};

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  
  const [editingId, setEditingId] = useState<number | null>(null);

  // Event handler for Add button
  const handleAddApplication = async () => {
    const response = await fetch(
      "http://localhost:3000/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          position,
          status,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    // Fetch updated applications
    const applicationsResponse = await fetch(
      "http://localhost:3000/applications"
    );

    const applicationsData = await applicationsResponse.json();

    setApplications(applicationsData);

    // Clear form fields
    setCompany("");
    setPosition("");
    setStatus("");
  };

  


  const handleDeleteApplication = async (id: number) => {

  const response = await fetch(
    `http://localhost:3000/applications/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  console.log(data);

  // Refresh applications
  const applicationsResponse = await fetch(
    "http://localhost:3000/applications"
  );

  const applicationsData = await applicationsResponse.json();

  setApplications(applicationsData);
};


const handleEditApplication = (application: Application) => {
  setEditingId(application.id);
  setCompany(application.company);
  setPosition(application.position);
  setStatus(application.status);
};

const handleUpdateApplication = async () => {
  const response = await fetch(
    `http://localhost:3000/applications/${editingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        position,
        status,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  const applicationsResponse = await fetch(
    "http://localhost:3000/applications"
  );

  const applicationsData = await applicationsResponse.json();

  setApplications(applicationsData);

  setCompany("");
  setPosition("");
  setStatus("");

  setEditingId(null);
};



  useEffect(() => {
    fetch("http://localhost:3000/applications")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      });
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <p>Company: {company}</p>
        <p>Position: {position}</p>
        <p>Status: {status}</p>

        <button
  onClick={
    editingId !== null
      ? handleUpdateApplication
      : handleAddApplication
  }
>
  {editingId !== null
    ? "Update Application"
    : "Add Application"}
</button>
      </div>

      <h1>Internship Tracker</h1>

      {applications.map((application) => (
        <div key={application.id}>
  <h2>{application.company}</h2>
  <p>{application.position}</p>
  <p>{application.status}</p>

  <button
  onClick={() => handleDeleteApplication(application.id)}
>
  Delete
</button>

<button
  onClick={() => handleEditApplication(application)}
>
  Edit
</button>

</div>
      ))}
    </div>
  );
}



export default App;