import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../images/Geopostcodes-logo-header.svg';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-logo">
    <img src={logo} alt="Logo" className="header-image" /></div>
    <nav className="header-nav" style={{minWidth:600}}>
      <Link to="/data-explorer">Data Explorer</Link>
      <Link to="/map-explorer">Map Explorer</Link>
      <Link to="/download-center">Download Center</Link>
      <Link to="/knowledge-base">Knowledge Base</Link>
    </nav>
    <div className="header-profile">
      <div className='profile'>
      <p>jerome.mesters@geopostcodes.com</p>
      <p style={{fontWeight:600}}>GeoPostcodes</p>
      </div>
      <div className="profile-icon"><div style={{alignSelf:"center"}}>👤</div></div>
    </div>
  
  </header>
);

export default Header;