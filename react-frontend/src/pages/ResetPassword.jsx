import React, { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { resetPassword, resetPasswordCheck } from '../api/authApi'

export const ResetPassword = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(undefined)
  const [message, setMessage] = useState(undefined)
  const [password, setPassword] = useState('')

  useEffect(() => {
    resetPasswordCheck(token)
      .then(_ => {
        console.log('valid Link')
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(_ => setIsLoading(false))
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)
    resetPassword(token, password)
      .then(() => {
        setMessage('Password changed successfully')
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(_ => setIsLoading(false))
  }

  return (
    <div className="container pt-3">
      { message && (
        <Alert variant='success text-center'>{message} <Link to="/">Return Home</Link> </Alert>
      ) }
      { error && (
        <Alert variant='danger text-center'>{error}</Alert>
      ) }
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      )}
      {!isLoading && !error && !message && (
        <div className="row">
          <div className="col">
            <h3 className="text-center">Enter your new password</h3>
            <form onSubmit={handleSubmit} >
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className="btn btn-success mt-3" type="submit" disabled={error}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
