import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import BooksList from "./components/BooksList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";

function App() {
  const { user } = useContext(UserContext);
  // save logged in user's details in state, moved to user context instead since it needs to be accessed globally & avoid props drilling
  // const [user, setUser] = useState(null);

  // // saves the logged in user's details in state. Using useContext instead, so this is no longer needed.
  // function handleLogin(user) {
  //   setUser(user);
  //   console.log(user);
  // }

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => console.log(user));
        // r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        {/* wrap components that need access to context data in the UserProvider*/}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {user && <Route path="/books" element={<BooksList />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
