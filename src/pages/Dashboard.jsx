import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useSearchParams } from "react-router-dom"
import { leadStatuses } from "../data/leadStatuses"
import LeadListItem from "../components/LeadListItem"
import "../css/Dashboard.css"

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
  const fetchLeads = async () => {
    try {
      const status = searchParams.get("status") || ""
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${BASE_URL}/leads?status=${status}`)
      setLeads(response.data)
    } catch (error) {
      console.error("Error fetching leads:", error)
    }
  }
  fetchLeads()
}, [searchParams])


  const handleFilter = (status) => {
    setSearchParams({ status })
  }

  const leadsByStatus = leadStatuses.reduce((acc, status) => {
    acc[status] = leads.filter((lead) => lead.status === status)
    return acc
  }, {})

  return (
    <div>
   <div className="d-flex justify-content-between">
       <h2>Anvaya CRM Dashboard</h2>
      <div className="mb-3">
        <Link to="/leads/new" className="btn btn-primary">
          + Add New Lead
        </Link>
      </div>
   </div>
      <div className="mb-3">
        {leadStatuses.map((status) => (
          <button
            key={status}
            className="btn btn-outline-secondary filter-btn"
            onClick={() => handleFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      {leadStatuses.map((status) => (
        <div key={status} className="mb-4">
          <h4>
            {status}: {leadsByStatus[status].length} Leads
          </h4>
          <ul className="list-group">
            {leadsByStatus[status]?.map((lead) => (
              <LeadListItem key={lead._id} lead={lead} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
