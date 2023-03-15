import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userProfile } from '../api/userApi';
import { logout } from '../api/authApi';
import { UserContext } from '../context/userContext';

export const NavBar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    userProfile()
      .then(data => {
        setUserInfo(data);
      })
      .catch(error => {
        setUserInfo(undefined);
        console.log(error)
      })
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setUserInfo(null);
  };

  return (
    <header className="container">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Blog</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {userInfo && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/create'}>Create new Post</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>{userInfo.email}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                  </li>
               </ul> 
            )}
            {!userInfo && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>Register</Link>
                  </li>
               </ul> 
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
