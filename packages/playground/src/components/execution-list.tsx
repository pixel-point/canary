import React from 'react'
import { Link } from 'react-router-dom'

const mockExecutions = [
  {
    id: '1',
    name: 'Pipeline One',
    description: 'This is the first Pipeline.'
  },
  { id: '2', name: 'Pipeline Two', description: 'This is the second Pipeline.' },
  { id: '3', name: 'Pipeline Three', description: 'This is the third Pipeline.' }
]

export default function ExecutionList() {
  return (
    <div>
      <ul>
        {mockExecutions.map(execution => (
          <li key={execution.id}>
            <Link to={`executions/${execution.id}`}>Execution {execution.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
