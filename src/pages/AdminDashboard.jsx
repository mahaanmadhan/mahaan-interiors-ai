import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const querySnapshot = await getDocs(collection(db, "leads"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLeads(data);
  };

  const updateStatus = async (leadId, newStatus) => {
    try {
      await updateDoc(doc(db, "leads", leadId), {
        status: newStatus,
      });

      fetchLeads();
    } catch (error) {
      console.error(error);
      alert("Error updating status");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Mahaan_Leads.xlsx");
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.mobile?.includes(search)
  );

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Mahaan CRM Dashboard</h1>

      <button onClick={exportToExcel} style={exportButton}>
        Export Leads to Excel
      </button>

      <div style={cardsWrapper}>
        <div style={cardStyle}>
          <h2>{leads.length}</h2>
          <p>Total Leads</p>
        </div>

        <div style={cardStyle}>
          <h2>{leads.filter((lead) => lead.status === "New Lead").length}</h2>
          <p>New Leads</p>
        </div>

        <div style={cardStyle}>
          <h2>{leads.filter((lead) => lead.status === "Contacted").length}</h2>
          <p>Contacted</p>
        </div>

        <div style={cardStyle}>
          <h2>{leads.filter((lead) => lead.status === "Converted").length}</h2>
          <p>Converted</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by name or mobile"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchInput}
      />

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Mobile</th>
            <th style={cellStyle}>Location</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>WhatsApp</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td style={cellStyle}>{lead.name}</td>
              <td style={cellStyle}>{lead.mobile}</td>
              <td style={cellStyle}>{lead.location}</td>

              <td style={cellStyle}>
                <select
                  value={lead.status || "New Lead"}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  style={selectStyle}
                >
                  <option>New Lead</option>
                  <option>Contacted</option>
                  <option>Site Visit</option>
                  <option>Quotation Sent</option>
                  <option>Converted</option>
                  <option>Lost</option>
                </select>
              </td>

              <td style={cellStyle}>
                <a
                  href={`https://wa.me/91${lead.mobile}`}
                  target="_blank"
                  rel="noreferrer"
                  style={whatsappLink}
                >
                  Message
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const pageStyle = {
  background: "#111",
  minHeight: "100vh",
  color: "white",
  padding: "30px",
};

const titleStyle = {
  color: "#D4AF37",
  marginBottom: "20px",
};

const exportButton = {
  background: "#D4AF37",
  color: "#000",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
  fontWeight: "bold",
};

const cardsWrapper = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
  flexWrap: "wrap",
};

const cardStyle = {
  background: "#1a1a1a",
  padding: "20px",
  borderRadius: "12px",
  minWidth: "220px",
  border: "1px solid #333",
};

const searchInput = {
  padding: "12px",
  width: "350px",
  maxWidth: "100%",
  borderRadius: "8px",
  border: "1px solid #333",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#181818",
};

const cellStyle = {
  border: "1px solid #333",
  padding: "12px",
  textAlign: "left",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "8px",
};

const whatsappLink = {
  color: "#25D366",
  fontWeight: "bold",
  textDecoration: "none",
};