import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage,LoginPage,RegisterPage,BookPage,UserPage } from './pages';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
    return (
        <div className="app">
            <Navbar />
            <div className='main-section'>
                {/* react-router-dom>6.0 new classes */}
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/book/:OLId" element={<BookPage />} />
                        <Route path="/user" element={<UserPage />} />
                    </Routes>
                </Router>
            </div>
            <Footer />
        </div>
    );
}

export default App;
