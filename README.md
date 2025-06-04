 Anvaya project 
 
Purpose
Anvaya is a simple CRM web app to manage leads, assign tasks to sales agents, and track performance with reports.

Goals
Lead management.
Enable sales agents to track leads and agents.
Provide clear reports on lead progress.

Key Features
Lead Management
Create/edit/delete leads (name, email, phone, company, priority, lifecycle stage, assigned agent).
List leads with filters (sales agent, priority, stage) and sorting (closing date, priority).
URL-based filtering (e.g., /leads?salesAgent=John).
Reports
Bar chart: Leads closed last week.
Pie chart: Lead status distribution (New, Contacted, Qualified, Closed).
Filter reports by agent or date range.
User Management
Assign agents to leads.
Admins add/remove agents.


Technical Requirements

Frontend: React, bootstrap and CSS.
Backend: Node.js, Express, MongoDB.
API: RESTful for CRUD on leads/agents.
Charts: Chart.js for reports.
Deployment: Github and Vercel.
User Interface
Lead List: Table with filter/sort options.
Lead Form: Add/edit lead details.
Lead Details: View lead all details.
Reports: Show charts with filters.
Sidebar: Menu for Leads, Reports, Users.


Anvaya CRM Checklist

Backend
Set up Node.js/Express with MongoDB.
Create schemas: leads, agents, tags, comments.
Build REST API: CRUD /leads (filter by agent, leads),                                              POST/GET /leads/:id/comments, GET /reports (closed-last-week, status-distribution).
Seed sample data (5 leads, 2 agents).
Test APIs with Postman.


Frontend
Set up React and for styling bootstrap.
Build components: LeadList, LeadForm, LeadDetails,Reports, Sidebar (menu).
Connect to APIs (fetch/axios).
Support URL filters (e.g., /leads?salesAgent=John).
Reports
Bar chart: Leads closed last week.
Pie chart: Lead status.

Testing
Test on Chrome, Firefox, Edge,                                                                                             Test lead/agent CRUD.
Test responsiveness
Test mobile UI


