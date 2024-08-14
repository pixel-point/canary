import React from 'react'
import { Link } from 'react-router-dom'
import PullRequestList from '../components/pull-request-list'

const mockPullRequests = [
  { id: '1', name: 'Pull Request One', description: 'This is the first pull request.' },
  { id: '2', name: 'Pull Request Two', description: 'This is the second pull request.' },
  { id: '3', name: 'Pull Request Three', description: 'This is the third pull request.' }
]

function PullRequestListPage() {
  return <PullRequestList />
}

export default PullRequestListPage
