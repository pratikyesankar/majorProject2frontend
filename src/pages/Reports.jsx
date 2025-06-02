import React, { useEffect, useState } from "react"
import axios from "axios"
import { leadStatuses } from "../data/leadStatuses"
import ChartComponent from "../components/ChartComponent"
import "../css/Reports.css"

function Reports() {
  const [leads, setLeads] = useState([])
  const [pipeline, setPipeline] = useState(0)
  const [closedByAgent, setClosedByAgent] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const leadsResponse = await axios.get("http://localhost:5000/leads")
        const pipelineResponse = await axios.get(
          "http://localhost:5000/report/pipeline"
        )
        const closedByAgentResponse = await axios.get(
          "http://localhost:5000/report/closed-by-agent"
        )
        setLeads(leadsResponse.data)
        setPipeline(pipelineResponse.data.totalLeadsInPipeline)
        setClosedByAgent(closedByAgentResponse.data)
      } catch (error) {
        console.error("Error fetching reports:", error)
      }
    }
    fetchReports()
  }, [])

  const leadsByStatus = leadStatuses.reduce((acc, status) => {
    acc[status] = leads.filter((lead) => lead.status === status).length
    return acc
  }, {})

  const statusChartData = {
    labels: leadStatuses,
    datasets: [
      {
        data: leadStatuses.map((status) => leadsByStatus[status] || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  }

  const closedByAgentChartData = {
    labels: closedByAgent.map((agent) => agent.name),
    datasets: [
      {
        label: "Leads Closed",
        data: closedByAgent.map((agent) => agent.count),
        backgroundColor: "#36A2EB",
      },
    ],
  }

  return (
    <div>
      <h2>Anvaya CRM Reports</h2>
      <div className="chart-container">
        <h4>Lead Status Distribution</h4>
        <ChartComponent
          type="pie"
          data={statusChartData}
          options={{
            title: { text: "Lead Status Distribution" },
          }}
        />
      </div>
      <div className="chart-container">
        <h4>Leads Closed by Sales Agent</h4>
        <ChartComponent
          type="bar"
          data={closedByAgentChartData}
          options={{
            title: { text: "Leads Closed by Sales Agent" },
          }}
        />
      </div>
      <div>
        <h4>Total Leads in Pipeline: {pipeline}</h4>
      </div>
    </div>
  )
}

export default Reports
