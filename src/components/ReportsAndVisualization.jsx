import React, { useCallback } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { leadStatuses, salesAgents } from "../data/leads"

const ReportsAndVisualization = ({ leads }) => {
  const getLeadsClosedLastWeek = useCallback(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return leads.filter(
      (lead) =>
        lead.closedDate &&
        new Date(lead.closedDate) >= oneWeekAgo &&
        lead.status.startsWith("Closed")
    )
  }, [leads])

  const leadsClosedLastWeek = getLeadsClosedLastWeek()
  const closedStatusData = [
    {
      name: "Closed - Won",
      value: leadsClosedLastWeek.filter((l) => l.status === "Closed - Won")
        .length,
    },
    {
      name: "Closed - Lost",
      value: leadsClosedLastWeek.filter((l) => l.status === "Closed - Lost")
        .length,
    },
  ]
  const COLORS_CLOSED = ["#82ca9d", "#ffc658"]

  const totalLeadsInPipelineData = leadStatuses
    .filter((status) => !status.startsWith("Closed"))
    .map((status) => ({
      name: status,
      count: leads.filter((lead) => lead.status === status).length,
    }))
  const COLORS_PIPELINE = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#a4de6c",
    "#d0ed57",
    "#83a6ed",
  ]

  const leadsByAgentData = salesAgents.map((agent) => ({
    name: agent,
    closedWon: leads.filter(
      (l) => l.agent === agent && l.status === "Closed - Won"
    ).length,
    closedLost: leads.filter(
      (l) => l.agent === agent && l.status === "Closed - Lost"
    ).length,
  }))

  const leadStatusDistributionData = leadStatuses.map((status) => ({
    name: status,
    value: leads.filter((lead) => lead.status === status).length,
  }))
  const COLORS_STATUS_DISTRIBUTION = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19A3",
  ]

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Reports and Visualizations
      </h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Leads Closed Last Week
        </h3>
        {leadsClosedLastWeek.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={closedStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {closedStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_CLOSED[index % COLORS_CLOSED.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">
            No leads closed last week.
          </p>
        )}
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Total Leads in Pipeline by Status
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={totalLeadsInPipelineData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Closed Leads by Sales Agent
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={leadsByAgentData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="closedWon"
              stackId="a"
              fill="#82ca9d"
              name="Closed Won"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="closedLost"
              stackId="a"
              fill="#ffc658"
              name="Closed Lost"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Lead Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={leadStatusDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {leadStatusDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS_STATUS_DISTRIBUTION[
                      index % COLORS_STATUS_DISTRIBUTION.length
                    ]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ReportsAndVisualization
