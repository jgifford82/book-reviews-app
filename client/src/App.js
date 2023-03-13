import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import BooksList from "./components/BooksList";
import ReviewsList from "./components/BookReviewsList";
import UserBooksList from "./components/UserBooksList";
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

  // Fetches books data (containing reviews for each book) from backend server & sets state with that data.
  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      //   .then((data) => console.log(data));
      .then((data) => setBooks(data));
  }, []);

  // console.log(books);

  // Updates state responsible for rendering books when new book is added, which refreshes the page to display new book. Callback function passed as a prop to child (BooksForm) so the new book can be sent up to parent (BooksList).
  function handleAddBook(newBook) {
    // console.log("In BooksList:", newBook);
    setBooks([newBook, ...books]);
  }

  // Updates state responsible for rendering books when new review is added, which refreshes the page to display new review. Callback function passed as a prop to child (BookReviewsForm) so the new book can be sent up to parent (BookRevewsList).
  function handleAddReview(newReview) {
    // console.log("In BookReviewsList:", newReview);
    // map over books. if the book id matches the new review's foreign key for book id, it will copy the book and nested reviews, and add in the new review. Otherwise, it will return the existing book.
    const updateBooks = books.map((book) => {
      if (book.id === newReview.book_id) {
        return {
          ...book,
          reviews: [newReview, ...book.reviews],
        };
      }
      return book;
    });
    // console.log(updateBooks);
    setBooks(updateBooks);
  }

  // don't need setUser in dependency array, but added it in to clear warning on browser console. removing dependency array led to continuous fetches.
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        // r.json().then((user) => console.log(user));
        r.json().then((user) => setUser(user));
      }
    });
  }, [setUser]);

  return (
    <div className="App">
      <Router>
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
          <Route
            path="/books/:id"
            element={
              <ReviewsList books={books} onAddReview={handleAddReview} />
            }
          />
          <Route path="/users/:id" element={<UserBooksList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
