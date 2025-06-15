export const initialLeads = [
  {
    id: "l1",
    name: "Acme Corp",
    source: "Website",
    agent: "John Doe",
    status: "New",
    tags: ["High Value"],
    timeToClose: 30,
    priority: "High",
    comments: [
      {
        author: "Admin",
        timestamp: "2025-05-20T10:00:00Z",
        text: "Initial contact made.",
      },
      {
        author: "John Doe",
        timestamp: "2025-05-21T14:30:00Z",
        text: "Sent introductory email.",
      },
    ],
    closedDate: null,
  },
  {
    id: "l2",
    name: "Globex Inc.",
    source: "Referral",
    agent: "Jane Smith",
    status: "Contacted",
    tags: ["Follow-up", "Enterprise"],
    timeToClose: 45,
    priority: "Medium",
    comments: [
      {
        author: "Admin",
        timestamp: "2025-05-18T09:00:00Z",
        text: "Referred by partner.",
      },
      {
        author: "Jane Smith",
        timestamp: "2025-05-22T11:00:00Z",
        text: "Had a discovery call. Good potential.",
      },
    ],
    closedDate: null,
  },
  {
    id: "l3",
    name: "Cyberdyne Systems",
    source: "Cold Call",
    agent: "Peter Jones",
    status: "Qualified",
    tags: ["Urgent"],
    timeToClose: 15,
    priority: "High",
    comments: [
      {
        author: "Admin",
        timestamp: "2025-05-15T15:00:00Z",
        text: "Cold call successful.",
      },
      {
        author: "Peter Jones",
        timestamp: "2025-05-23T16:00:00Z",
        text: "Qualified lead, ready for proposal.",
      },
    ],
    closedDate: null,
  },
]

export const salesAgents = ["John Doe", "Jane Smith", "Peter Jones"]
export const leadSources = ["Website", "Referral", "Cold Call", "Event"]
export const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Closed - Won",
  "Closed - Lost",
]
export const tags = ["High Value", "Follow-up", "Urgent", "SMB", "Enterprise"]
export const priorities = ["High", "Medium", "Low"]
