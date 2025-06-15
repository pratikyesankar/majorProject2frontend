import React, { useState } from "react"
import Select from "./Select"
import { salesAgents, leadStatuses, tags } from "../data/leads"

const LeadStatusView = ({ leads, navigate }) => {
  const [filterAgent, setFilterAgent] = useState("")
  const [filterTags, setFilterTags] = useState("")

  const groupedLeads = leadStatuses.reduce((acc, status) => {
    acc[status] = leads.filter((lead) => {
      let matches = lead.status === status
      if (filterAgent && lead.agent !== filterAgent) matches = false
      if (filterTags && !lead.tags.includes(filterTags)) matches = false
      return matches
    })
    return acc
  }, {})

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Leads by Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Filter by Sales Agent"
          value={filterAgent}
          onChange={(e) => setFilterAgent(e.target.value)}
          options={salesAgents}
        />
        <Select
          label="Filter by Tags"
          value={filterTags}
          onChange={(e) => setFilterTags(e.target.value)}
          options={tags}
        />
      </div>
      <div className="space-y-8">
        {leadStatuses.map((status) => (
          <div
            key={status}
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              {status} ({groupedLeads[status].length})
            </h3>
            {groupedLeads[status].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedLeads[status].map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 rounded-md shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <h4 className="font-medium text-gray-800">{lead.name}</h4>
                    <p className="text-sm text-gray-600">Agent: {lead.agent}</p>
                    <p className="text-sm text-gray-600">
                      Time to Close: {lead.timeToClose} days
                    </p>
                    <p className="text-sm text-gray-600">
                      Priority: {lead.priority}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No leads in this status matching filters.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeadStatusView
