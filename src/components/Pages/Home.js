import React from 'react'
import { Link } from 'gatsby'
import { AppContent } from '../Layout'

const Home = () => {
  return (
    <div className="container-login">
      <AppContent>
        <h1>This will be tabbed control panel.</h1>
        <p>
          view  profile: <Link to="/profile">View profile</Link>
        </p>
      </AppContent>
    </div>
  )
}

export default Home
