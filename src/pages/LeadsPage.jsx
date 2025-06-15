import React from "react"
import LeadForm from "../components/LeadForm"
import LeadList from "../components/LeadList"

const LeadsPage = () => {
  return (
    <div className="p-4">
      <LeadForm onLeadCreated={() => window.location.reload()} />
      <LeadList />
    </div>
  )
}

export default LeadsPage
