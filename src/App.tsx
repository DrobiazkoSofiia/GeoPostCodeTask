import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DataExplorerPage from './pages/DataExplorerPage';
import CountryDetailsPage from './pages/CountryDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-explorer" element={<DataExplorerPage />} />
        <Route path="/data-explorer/:url" element={<CountryDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
