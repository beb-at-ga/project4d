import React from 'react'
import { Redirect } from '@reach/router'
import { AppUser } from '../Auth'
import { Layout } from '../Layout'


const PrivateRoute = (props) => {
  
  const { isLoggedIn } = AppUser
  if (!isLoggedIn()) {
    return <Redirect to="/signin" noThrow />
  }
  const { component: Component, location, ...rest } = props
  return (
    <Layout isUserNav={true}>
      <Component {...rest} />
    </Layout>
  )
}

export default PrivateRoute
