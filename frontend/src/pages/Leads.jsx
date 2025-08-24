import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, del } from "../api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = async () => {
    let res = await get(`/leads?page=${page}&limit=5`);
    setLeads(res.data || []);        
    setTotalPages(res.totalPages || 1);
  };

  useEffect(() => {
    fetchLeads();
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Leads</h2>
        <Link to="/leads/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            + Add Lead
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Company</th>
              <th className="py-2 px-4 text-left">City</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Score</th>
              <th className="py-2 px-4 text-left">Lead Value</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr
                key={lead._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">
                  {lead.first_name} {lead.last_name}
                </td>
                <td className="py-2 px-4">{lead.email}</td>
                <td className="py-2 px-4">{lead.phone}</td>
                <td className="py-2 px-4">{lead.company}</td>
                <td className="py-2 px-4">{lead.city}</td>
                <td className="py-2 px-4">{lead.status}</td>
                <td className="py-2 px-4">{lead.score}</td>
                <td className="py-2 px-4">{lead.lead_value}</td>
                <td className="py-2 px-4 space-x-2">
                  <Link to={`/leads/edit/${lead._id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={async () => {
                      await del(`/leads/${lead._id}`);
                      fetchLeads();
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Leads;
