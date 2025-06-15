import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getLeads, getAgents } from "../services/api"

const LeadList = () => {
  const [leads, setLeads] = useState([])
  const [agents, setAgents] = useState([])
  const [filters, setFilters] = useState({
    salesAgent: "",
    status: "",
    source: "",
    tags: "",
  })
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(location.search)
    setFilters({
      salesAgent: params.get("salesAgent") || "",
      status: params.get("status") || "",
      source: params.get("source") || "",
      tags: params.get("tags") || "",
    })
  }, [location.search])

  useEffect(() => {
    getLeads(filters).then((res) => setLeads(res.data))
    getAgents().then((res) => setAgents(res.data))
  }, [filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    const params = new URLSearchParams(newFilters).toString()
    navigate(`/leads?${params}`)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leads</h2>
      <div className="mb-4 flex space-x-4">
        <select
          name="salesAgent"
          value={filters.salesAgent}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Agents</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          {["New", "Contacted", "Qualified", "Proposal Sent", "Closed"].map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>
        <select
          name="source"
          value={filters.source}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Sources</option>
          {[
            "Website",
            "Referral",
            "Cold Call",
            "Advertisement",
            "Email",
            "Other",
          ].map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="tags"
          value={filters.tags}
          onChange={handleFilterChange}
          placeholder="Filter by tags (comma-separated)"
          className="p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {leads.map((lead) => (
          <a
            key={lead._id}
            href={`/leads/${lead._id}`}
            className="p-4 shadow rounded"
          >
            <h3 className="font-bold">{lead.name}</h3>
            <p>Status: {lead.status}</p>
            <p>Agent: {lead.salesAgent.name}</p>
            <p>Source: {lead.source}</p>
            <p>Priority: {lead.priority}</p>
            <p>Time to Close: {lead.timeToClose} days</p>
            <p>Tags: {lead.tags.join(", ")}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default LeadList
