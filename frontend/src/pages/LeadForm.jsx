import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { post, put, get } from "../api";

function LeadForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    last_activity_at: "",
    is_qualified: false,
  });

  useEffect(() => {
    if (id) {
      get(`/leads/${id}`).then((data) => setLead(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await put(`/leads/${id}`, lead);
    } else {
      await post("/leads", lead);
    }
    navigate("/leads");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
          {id ? "Edit Lead" : "Add Lead"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={lead.first_name}
            onChange={(e) => setLead({ ...lead, first_name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lead.last_name}
            onChange={(e) => setLead({ ...lead, last_name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Phone"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Company"
            value={lead.company}
            onChange={(e) => setLead({ ...lead, company: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="City"
            value={lead.city}
            onChange={(e) => setLead({ ...lead, city: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="State"
            value={lead.state}
            onChange={(e) => setLead({ ...lead, state: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <select
            value={lead.source}
            onChange={(e) => setLead({ ...lead, source: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="website">Website</option>
            <option value="facebook_ads">Facebook Ads</option>
            <option value="google_ads">Google Ads</option>
            <option value="referral">Referral</option>
            <option value="events">Events</option>
            <option value="other">Other</option>
          </select>
          <select
            value={lead.status}
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>
          <input
            type="number"
            placeholder="Score"
            value={lead.score}
            onChange={(e) => setLead({ ...lead, score: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Lead Value"
            value={lead.lead_value}
            onChange={(e) => setLead({ ...lead, lead_value: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="date"
            value={lead.last_activity_at?.split("T")[0] || ""}
            onChange={(e) => setLead({ ...lead, last_activity_at: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={lead.is_qualified}
              onChange={(e) => setLead({ ...lead, is_qualified: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Qualified?</span>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {id ? "Update Lead" : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
