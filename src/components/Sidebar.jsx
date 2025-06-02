import React from "react"
import { Link } from "react-router-dom"
import "../css/Sidebar.css"

function Sidebar() {
  return (
    <div className="sidebar col-2">
      <h3>Anvaya CRM</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/leads">
            Leads
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/agents">
            Sales Agents
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reports">
            Reports
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/status">
            Lead Status View
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/agent-view">
            Sales Agent View
          </Link>
        </li>
      </ul>
      <button className="btn btn-primary mt-3">
        <Link className="nav-link text-white" to="/">
          {" "}
          Back to Dashboard
        </Link>
      </button>
    </div>
  )
}

export default Sidebar
