import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import QuestionsManagement from './components/QuestionsManagement';
import ModelManagement from './components/ModelManagement';
import Navigation from './components/Navigation';
import './styles.css';

function App() {
  return (
      <Router>
        <div className="app-container">
          <Navigation />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/questions" element={<QuestionsManagement />} />
              <Route path="/models" element={<ModelManagement />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;