import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/movies/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/movies/watchlist">Watchlist</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
