import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userProfile } from '../api/userApi'
import { logout } from '../api/authApi'
import { UserContext } from '../context/userContext'
import { Nav, NavDropdown } from 'react-bootstrap'

export const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  useEffect(() => {
    userProfile()
      .then((data) => {
        setUserInfo(data)
      })
      .catch((error) => {
        setUserInfo(undefined)
        console.log(error)
      })
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    setUserInfo(null)
  }

  return (
    <header className="">
      <Nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {userInfo && (
              <ul className="navbar-nav">
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to={'/create'}>
                    Create new Post
                  </Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to={`/${userInfo.username}`}>
                    My posts
                  </Link>
                </Nav.Item>
                <NavDropdown title={userInfo.email} id="nav-dropdown">
                  <NavDropdown.Item>
                    <Link to={`/edit-profile/${userInfo.id}`} className='text-decoration-none'>Edit Profile</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item className="nav-item">
                  <Link className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </Nav.Item>
              </ul>
            )}
            {!userInfo && (
              <ul className="navbar-nav">
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to={'/login'}>
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link className="nav-link" to={'/register'}>
                    Register
                  </Link>
                </Nav.Item>
              </ul>
            )}
          </div>
        </div>
      </Nav>
    </header>
  )
}
