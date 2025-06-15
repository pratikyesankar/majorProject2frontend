import React, { useState } from "react"
import Select from "./Select"
import { salesAgents, leadStatuses } from "../data/leads"

const SalesAgentView = ({ leads, navigate }) => {
  const [filterStatus, setFilterStatus] = useState("")
  const [sortBy, setSortBy] = useState("")

  const groupedLeads = salesAgents.reduce((acc, agent) => {
    let agentLeads = leads.filter((lead) => {
      let matches = lead.agent === agent
      if (filterStatus && lead.status !== filterStatus) matches = false
      return matches
    })
    if (sortBy) {
      agentLeads.sort((a, b) => {
        if (sortBy === "timeToCloseAsc") return a.timeToClose - b.timeToClose
        if (sortBy === "timeToCloseDesc") return b.timeToClose - a.timeToClose
        if (sortBy === "priorityHigh") {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        if (sortBy === "priorityLow") {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        return 0
      })
    }
    acc[agent] = agentLeads
    return acc
  }, {})

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Leads by Sales Agent
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Filter by Lead Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={leadStatuses}
        />
        <Select
          label="Sort Leads"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            "priorityHigh",
            "priorityLow",
            "timeToCloseAsc",
            "timeToCloseDesc",
          ]}
        />
      </div>
      <div className="space-y-8">
        {salesAgents.map((agent) => (
          <div
            key={agent}
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              {agent} ({groupedLeads[agent].length} leads)
            </h3>
            {groupedLeads[agent].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedLeads[agent].map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 rounded-md shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <h4 className="font-medium text-gray-800">{lead.name}</h4>
                    <p className="text-sm text-gray-600">
                      Status: {lead.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Priority: {lead.priority}
                    </p>
                    <p className="text-sm text-gray-600">
                      Time to Close: {lead.timeToClose} days
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No leads assigned to this agent matching filters.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalesAgentView
