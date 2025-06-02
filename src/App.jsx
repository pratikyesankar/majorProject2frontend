import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import LeadList from "./pages/LeadList"
import LeadDetails from "./pages/LeadDetails"
import LeadStatusView from "./pages/LeadStatusView"
import SalesAgentView from "./pages/SalesAgentView"
import SalesAgentList from "./pages/SalesAgentList"
import SalesAgentForm from "./pages/SalesAgentForm"
import Reports from "./pages/Reports"
import LeadForm from "./components/LeadForm"

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="main-content flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadList />} />
            <Route path="/leads/:id" element={<LeadDetails />} />
            <Route path="/leads/new" element={<LeadForm />} />
            <Route path="/agents" element={<SalesAgentList />} />
            <Route path="/agents/new" element={<SalesAgentForm />} />
            <Route path="/status" element={<LeadStatusView />} />
            <Route path="/agent-view" element={<SalesAgentView />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
