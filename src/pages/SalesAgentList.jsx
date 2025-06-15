import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../css/SalesAgentList.css"

function SalesAgentList() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/agents")
        setAgents(response.data)
      } catch (error) {
        console.error("Error fetching agents:", error)
      }
    }
    fetchAgents()
  }, [])

  return (
    <div>
     <div className="d-flex justify-content-between">
       <h2>Sales Agents</h2>
      <div className="mb-3">
        <Link to="/agents/new" className="btn btn-primary">
          + Add New Agent
        </Link>
      </div>
     </div>
      <ul className="list-group bg-dark w-50">
        {agents.map((agent) => (
          <li key={agent._id} className="list-group-item bg-dark text-light">
            {agent.name} - {agent.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalesAgentList
