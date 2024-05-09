import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Payment from './components/Payment';
import Invoice from './components/Invoice';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="pt-12 flex-1"> {/* Padding-top to push the content below the NavBar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/invoices" element={<Invoice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
