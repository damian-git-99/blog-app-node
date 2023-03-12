import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <header className="container">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">Blog</Link>
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to={'/login'}>Login</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={'/register'}>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
