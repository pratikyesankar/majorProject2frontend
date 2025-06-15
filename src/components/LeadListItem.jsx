import React from "react"
import { useNavigate } from "react-router-dom"

function LeadListItem({ lead }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/leads/${lead._id}`)
  }

  return (
    <li
      className="list-group-item bg-dark text-light w-50"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {lead.name} - {lead.status} - {lead.salesAgent.name}
    </li>
  )
}

export default LeadListItem
