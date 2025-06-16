import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useSearchParams } from "react-router-dom"
import { leadStatuses, priorities } from "../data"
import LeadListItem from "../components/LeadListItem"
import "../css/LeadList.css"

function LeadList() {
  const [leads, setLeads] = useState([])
  const [agents, setAgents] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const params = {}
        if (searchParams.get("status"))
          params.status = searchParams.get("status")
        if (searchParams.get("salesAgent"))
          params.salesAgent = searchParams.get("salesAgent")
        const response = await axios.get("https://major-project2backend-wsj7.vercel.app/leads", {
          params,
        })
        setLeads(response.data)
      } catch (error) {
        console.error("Error fetching leads:", error)
      }
    }
    const fetchAgents = async () => {
      try {
        const response = await axios.get("https://major-project2backend-wsj7.vercel.app/agents")
        setAgents(response.data)
      } catch (error) {
        console.error("Error fetching agents:", error)
      }
    }
    fetchLeads()
    fetchAgents()
  }, [searchParams])

  const handleFilter = (key, value) => {
    setSearchParams({ [key]: value })
  }

  return (
    <div>
     <div className="d-flex justify-content-between">
       <h2>Lead List</h2>
      <div className="mb-3">
        <Link to="/leads/new" className="btn btn-primary">
          + Add New Lead
        </Link>
      </div>
     </div>
      <div className="mb-3">
        <label>Filter by Status:</label>
        {leadStatuses.map((status) => (
          <button
            key={status}
            className="btn btn-outline-secondary filter-btn"
            onClick={() => handleFilter("status", status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="mb-3">
        <label>Filter by Agent:</label>
        {agents.map((agent) => (
          <button
            key={agent._id}
            className="btn btn-outline-secondary filter-btn"
            onClick={() => handleFilter("salesAgent", agent._id)}
          >
            {agent.name}
          </button>
        ))}
      </div>
      <ul className="list-group">
        {leads.map((lead) => (
          <LeadListItem key={lead._id} lead={lead} />
        ))}
      </ul>
    </div>
  )
}

export default LeadList
