import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../css/SalesAgentForm.css"

function SalesAgentForm() {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://major-project2backend-wsj7.vercel.app/agents", formData)
      navigate("/agents")
    } catch (error) {
      console.error("Error creating agent:", error)
    }
  }

  return (
    <div>
      <h2>Add New Sales Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label bg-dark">Agent Name</label>
          <input
            type="text"
            name="name"
            className="form-control bg-dark"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label bg-dark">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control bg-dark"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Agent
        </button>
      </form>
    </div>
  )
}

export default SalesAgentForm
