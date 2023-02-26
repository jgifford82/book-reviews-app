import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // save logged in user's details in state
  const [user, setUser] = useState(null);

  // saves the logged in user's details in state
  function handleLogin(user) {
    setUser(user);
    // console.log(user);
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
