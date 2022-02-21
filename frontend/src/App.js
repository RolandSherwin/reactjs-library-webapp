import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar, BookPage, HomePage, LoginPage, RegisterPage, UserPage } from './containers';
import { Footer } from './components';

function App() {
  return (
      <div className="App">
          <Navbar />
          {/* react-router-dom>6.0 new classes */}
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/book/:OLId" element={<BookPage/>}/>
                  <Route path="/user" element={<UserPage/>}/>
              </Routes>
          </Router>
          <Footer />
      </div>
  );
}

export default App;
