import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import BooksList from "./components/BooksList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";

function App() {
  const { user, setUser } = useContext(UserContext);
  // save logged in user's details in state, moved to user context instead since it needs to be accessed globally & avoid props drilling
  // const [user, setUser] = useState(null);

  // // saves the logged in user's details in state. Using useContext instead, so this is no longer needed.
  // function handleLogin(user) {
  //   setUser(user);
  //   console.log(user);
  // }
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      //   .then((data) => console.log(data));
      .then((data) => setBooks(data));
  }, [books]);

  // console.log(books);

  // Updates state responsible for rendering books when new book is added, which refreshes the page to display new book. Callback function passed as a prop to child (BooksForm) so the new book can be sent up to parent (BooksList).
  function handleAddBook(newBook) {
    // console.log("In BooksList:", newBook);
    setBooks([...books, newBook]);
  }

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        // r.json().then((user) => console.log(user));
        r.json().then((user) => setUser(user));
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
          {/* if user is truthy, && operator returns the route so a user that's logged in can see the books */}
          {user && (
            <Route
              path="/books"
              element={<BooksList books={books} onAddBook={handleAddBook} />}
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
