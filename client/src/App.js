import "./App.css";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <SignUp />
    </div>
  );
}

export default App;
