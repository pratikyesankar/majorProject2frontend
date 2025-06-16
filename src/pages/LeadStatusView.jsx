import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useSearchParams } from "react-router-dom"
import { leadStatuses, priorities } from "../data"
import LeadListItem from "../components/LeadListItem"
import "../css/LeadStatusView.css"

function LeadStatusView() {
  const [leads, setLeads] = useState([])
  const [agents, setAgents] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const params = {}
        if (searchParams.get("salesAgent"))
          params.salesAgent = searchParams.get("salesAgent")
        if (searchParams.get("priority"))
          params.priority = searchParams.get("priority")
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

  const leadsByStatus = leadStatuses.reduce((acc, status) => {
    acc[status] = leads.filter((lead) => lead.status === status)
    return acc
  }, {})

  return (
    <div>
      <h2>Leads by Status</h2>
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
      <div className="mb-3">
        <label>Filter by Priority:</label>
        {priorities.map((priority) => (
          <button
            key={priority}
            className="btn btn-outline-secondary filter-btn"
            onClick={() => handleFilter("priority", priority)}
          >
            {priority}
          </button>
        ))}
      </div>
      {leadStatuses.map((status) => (
        <div key={status} className="mb-4">
          <h4>{status}</h4>
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

export default LeadStatusView
