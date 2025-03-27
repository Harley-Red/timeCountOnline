import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from "./component/counter";
import History from "./component/History";
import './App.css'

function App() {
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("timer-records");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  return (
    <Router>
      <div className="App">
        <nav className="flex justify-center space-x-4 p-4 bg-gray-800 text-white">
          <Link to="/" className="hover:underline">计时器</Link>
          <Link to="/history" className="hover:underline">记录</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Counter records={records} setRecords={setRecords} />} />
          <Route path="/history" element={<History records={records} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
