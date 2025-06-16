import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import "../css/LeadDetails.css"

function LeadDetails() {
  const { id } = useParams()
  const [lead, setLead] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLead = async () => {
      try {
        console.log("Fetching lead with ID:", id)
        const response = await axios.get(`https://major-project2backend-wsj7.vercel.app/leads/${id}`)
        console.log("Lead response:", response.data)
        setLead(response.data)
        setError(null)
      } catch (error) {
        console.error("Error fetching lead:", error.response || error)
        setError(
          error.response?.data?.message ||
            "Failed to load lead. Please check the lead ID or server status."
        )
        setLead(null)
      }
    }
    fetchLead()
  }, [id])

  if (lead === null && error) {
    return (
      <div className="lead-details">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (!lead) {
    return <div className="lead-details">Loading...</div>
  }

  return (
    <div className="lead-details">
      <h2>Lead Details</h2>
      <div className="p-3 border rounded w-50">
        <p>
          <strong>Name:</strong> {lead.name}
        </p>
        <p>
          <strong>Source:</strong> {lead.source}
        </p>
        <p>
          <strong>Sales Agent:</strong> {lead.salesAgent?.name || "Unknown"}
        </p>
        <p>
          <strong>Status:</strong> {lead.status}
        </p>
        <p>
          <strong>Priority:</strong> {lead.priority}
        </p>
        <p>
          <strong>Time to Close:</strong> {lead.timeToClose} days
        </p>
        <p>
          <strong>Tags:</strong> {lead.tags?.join(", ") || "None"}
        </p>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </div>
  )
}

export default LeadDetails
