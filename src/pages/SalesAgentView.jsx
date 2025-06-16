import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useSearchParams } from "react-router-dom"
import { leadStatuses, priorities } from "../data"
import LeadListItem from "../components/LeadListItem"
import "../css/SalesAgentView.css"

function SalesAgentView() {
  const [leads, setLeads] = useState([])
  const [agents, setAgents] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const params = {}
        if (searchParams.get("status"))
          params.status = searchParams.get("status")
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

  const leadsByAgent = agents.reduce((acc, agent) => {
    acc[agent._id] = leads.filter((lead) => lead.salesAgent._id === agent._id)
    return acc
  }, {})

  return (
    <div>
      <h2>Leads by Sales Agent</h2>
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
      {agents.map((agent) => (
        <div key={agent._id} className="mb-4">
          <h4>{agent.name}</h4>
          <ul className="list-group">
            {leadsByAgent[agent._id]?.map((lead) => (
              <LeadListItem key={lead._id} lead={lead} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default SalesAgentView
