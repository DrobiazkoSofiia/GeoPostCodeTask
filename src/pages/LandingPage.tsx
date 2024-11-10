import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './LandingPage.css';

const LandingPage: React.FC = () => (
  <div>
    <Header />
    <div className="landing-container">
      <h1 style={{color:'#0A3A6B'}}>Welcome to GeoPostcodes' Customer Portal</h1>
      <div className="landing-options">
        <Link to="/data-explorer" className="option1" >
          <div>🔍 Data Explorer</div>
        </Link>
        <Link to="/map-explorer" className="option3">
          <div>🗺️ Map Explorer</div>
        </Link>
        <Link to="/download-center" className="option2">
          <div>📂 Download Center</div>
        </Link>
        <Link to="/knowledge-base" className="option4">
          <div>📘 Knowledge Base</div>
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
