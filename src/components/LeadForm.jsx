import React, { useState, useEffect } from "react"
import axios from "axios"
import { leadSources, leadStatuses, priorities } from "../data.js"

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    tags: [],
    timeToClose: "",
    priority: "Medium",
  })
  const [agents, setAgents] = useState([])
  const [message, setMessage] = useState("") // Optional: Add state for feedback

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/agents")
        setAgents(response.data)
      } catch (error) {
        console.error("Error fetching agents:", error)
        setMessage("Failed to fetch agents.")
      }
    }
    fetchAgents()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleTagsChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setFormData({ ...formData, tags: selectedTags })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/leads", formData)
      setMessage("Lead created successfully!")

      setFormData({
        name: "",
        source: "",
        salesAgent: "",
        status: "New",
        tags: [],
        timeToClose: "",
        priority: "Medium",
      })
    } catch (error) {
      console.error("Error creating lead:", error)
      setMessage("Failed to create lead.")
    }
  }

  return (
    <div>
      <h2>Add New Lead</h2>
      {message && <div className="alert alert-info">{message}</div>}{" "}
      {/* Optional: Display feedback */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Lead Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lead Source</label>
          <select
            name="source"
            className="form-control"
            value={formData.source}
            onChange={handleChange}
            required
          >
            <option value="">Select Source</option>
            {leadSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Sales Agent</label>
          <select
            name="salesAgent"
            className="form-control"
            value={formData.salesAgent}
            onChange={handleChange}
            required
          >
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Lead Status</label>
          <select
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {leadStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Time to Close (Days)</label>
          <input
            type="number"
            name="timeToClose"
            className="form-control"
            value={formData.timeToClose}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <select
            multiple
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleTagsChange}
          >
            {["High Value", "Follow-up", "Urgent"].map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Lead
        </button>
      </form>
    </div>
  )
}

export default LeadForm
