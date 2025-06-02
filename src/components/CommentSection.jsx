import React, { useState, useEffect } from "react"
import axios from "axios"

function CommentSection({ leadId, salesAgentId }) {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/leads/${leadId}/comments`
        )
        setComments(response.data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }
    fetchComments()
  }, [leadId])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:5000/leads/${leadId}/comments`, {
        commentText,
        author: salesAgentId,
      })
      setCommentText("")
      const response = await axios.get(
        `http://localhost:5000/leads/${leadId}/comments`
      )
      setComments(response.data)
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  return (
    <div>
      <h3 className="mt-4">Comments</h3>
      <form onSubmit={handleCommentSubmit} className="mb-3">
        <div className="mb-3">
          <label className="form-label">Add Comment</label>
          <textarea
            className="form-control"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Comment
        </button>
      </form>
      <ul className="list-group">
        {comments.map((comment) => (
          <li key={comment._id} className="list-group-item">
            <strong>{comment.author.name}</strong> -{" "}
            {new Date(comment.createdAt).toLocaleString()}
            <p>{comment.commentText}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentSection
