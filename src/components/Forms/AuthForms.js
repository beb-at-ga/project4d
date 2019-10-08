import React from 'react'

export function AuthForm({ children, title, error }) {
  return (
    <div className="container-login">
      <div className="wrap-login card shadow p-3 mb-5 bg-white rounded mr-opacity">
        <form className="card-body auth-forms100">
          <h2>{title}</h2>
          {error && (
            <p className="text-danger">
              {error.message ? error.message : error}
            </p>
          )}
          {children}
        </form>
      </div>
    </div>
  )
}

export function GivenName({ handleUpdate, given_name, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterGivenName">First Name</label>
      <input
        onChange={handleUpdate}
        name="given_name"
        type="text"
        value={given_name}
        className="form-control"
        autoComplete={autoComplete}
        id="enterGivenName"
        aria-describedby="given_nameHelp"
        placeholder="Enter First Name"
      />
    </div>
  )
}


export function FamilyName({ handleUpdate, family_name, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterFamilyName">Last Name</label>
      <input
        onChange={handleUpdate}
        name="family_name"
        type="text"
        value={family_name}
        className="form-control"
        autoComplete={autoComplete}
        id="enterFamilyName"
        aria-describedby="family_nameHelp"
        placeholder="Enter Last Name"
      />
    </div>
  )
}

export function Email({ handleUpdate, email, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterEmailAddress">Email Address</label>
      <input
        onChange={handleUpdate}
        name="email"
        type="email"
        value={email}
        className="form-control"
        autoComplete={autoComplete}
        id="enterEmailAddress"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
  )
}

export function Password({ handleUpdate, password, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterPassword">Password</label>
      <input
        onChange={handleUpdate}
        autoComplete={autoComplete}
        name="password"
        value={password}
        type="password"
        className="form-control"
        placeholder="Password"
        id="enterPassword"
      />
    </div>
  )
}

export function ConfirmationCode({ handleUpdate, auth_code, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterCode">Confirmation Code</label>
      <input
        onChange={handleUpdate}
        autoComplete={autoComplete}
        name="auth_code"
        value={auth_code}
        type="text"
        className="form-control"
        placeholder="######"
        id="enterCode"
      />
    </div>
  )
}
