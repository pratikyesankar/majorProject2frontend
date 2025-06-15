import React, { useState, useEffect } from "react"
import Button from "./Button"
import Select from "./Select"
import Input from "./Input"
import { formatDate } from "../utils/formatDate"
import { leadStatuses, salesAgents, priorities, tags } from "../data/leads"

const LeadDetails = ({ lead, onUpdateLead, onAddComment, navigate }) => {
  const [newComment, setNewComment] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [updatedLead, setUpdatedLead] = useState({ ...lead })

  useEffect(() => {
    setUpdatedLead({ ...lead })
  }, [lead])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        author: "Current User",
        timestamp: new Date().toISOString(),
        text: newComment.trim(),
      }
      onAddComment(lead.id, comment)
      setNewComment("")
    }
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    onUpdateLead(lead.id, updatedLead)
    setEditMode(false)
  }

  if (!lead) {
    return (
      <div className="p-6 text-center text-gray-600">
        Select a lead to see details.
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{lead.name}</h2>
        <Button
          onClick={() => setEditMode(!editMode)}
          className="bg-gray-500 hover:bg-gray-600"
        >
          {editMode ? "Cancel Edit" : "Edit Lead"}
        </Button>
      </div>
      {!editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Source:</strong> {lead.source}
          </p>
          <p>
            <strong>Assigned Agent:</strong> {lead.agent}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                lead.status === "New"
                  ? "bg-blue-100 text-blue-800"
                  : lead.status === "Contacted"
                  ? "bg-yellow-100 text-yellow-800"
                  : lead.status === "Qualified"
                  ? "bg-green-100 text-green-800"
                  : lead.status === "Proposal Sent"
                  ? "bg-purple-100 text-purple-800"
                  : lead.status.startsWith("Closed")
                  ? "bg-gray-100 text-gray-800"
                  : ""
              }`}
            >
              {lead.status}
            </span>
          </p>
          <p>
            <strong>Time to Close:</strong> {lead.timeToClose} days
          </p>
          <p>
            <strong>Priority:</strong>{" "}
            <span
              className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                lead.priority === "High"
                  ? "bg-red-100 text-red-800"
                  : lead.priority === "Medium"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {lead.priority}
            </span>
          </p>
          <div className="col-span-full">
            <strong>Tags:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {lead.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdateSubmit} className="mt-4">
          <Select
            label="Lead Status"
            value={updatedLead.status}
            onChange={(e) =>
              setUpdatedLead({ ...updatedLead, status: e.target.value })
            }
            options={leadStatuses}
          />
          <Select
            label="Assigned Sales Agent"
            value={updatedLead.agent}
            onChange={(e) =>
              setUpdatedLead({ ...updatedLead, agent: e.target.value })
            }
            options={salesAgents}
          />
          <Input
            label="Time to Close (days)"
            type="number"
            value={updatedLead.timeToClose}
            onChange={(e) =>
              setUpdatedLead({
                ...updatedLead,
                timeToClose: parseInt(e.target.value, 10) || 0,
              })
            }
          />
          <Select
            label="Priority"
            value={updatedLead.priority}
            onChange={(e) =>
              setUpdatedLead({ ...updatedLead, priority: e.target.value })
            }
            options={priorities}
          />
          <Select
            label="Tags"
            value={updatedLead.tags}
            onChange={(e) => {
              const options = e.target.options
              const value = []
              for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value.push(options[i].value)
                }
              }
              setUpdatedLead({ ...updatedLead, tags: value })
            }}
            options={tags}
            multiple={true}
          />
          <Button type="submit" className="w-full mt-4">
            Save Changes
          </Button>
        </form>
      )}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {lead.comments.length > 0 ? (
            lead.comments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100"
              >
                <p className="text-sm text-gray-800">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  — {comment.author} on {formatDate(comment.timestamp)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment..."
            rows="3"
            className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <Button onClick={handleAddComment} className="sm:self-end">
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeadDetails
