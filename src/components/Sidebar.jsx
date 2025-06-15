 import React from "react"
import { Link } from "react-router-dom"
import "../css/Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUser,
  faUsers,
  faFileAlt,
  faShieldAlt,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="sidebar col-2">
     <h3> <Link  className="nav-link text-decoration-none" to="/" >Anvaya CRM</Link></h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/">
            <FontAwesomeIcon icon={faTachometerAlt} />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/leads">
            <FontAwesomeIcon icon={faUser} />
            Leads
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/agents">
            <FontAwesomeIcon icon={faUsers} />
            Sales Agents
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/reports">
            <FontAwesomeIcon icon={faFileAlt} />
            Reports
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/status">
            <FontAwesomeIcon icon={faShieldAlt} />
            Lead Status View
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/agent-view">
            <FontAwesomeIcon icon={faUserCheck} />
            Sales Agent View
          </Link>
        </li>
      </ul>

      <button className="btn btn-primary mt-3">
        <Link className="nav-link text-white" to="/">
          Back to Dashboard
        </Link>
      </button>
    </div>
  )
}

export default Sidebar
