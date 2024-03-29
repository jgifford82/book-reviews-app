import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import BooksList from "./components/BooksList";
import BookReviewsList from "./components/BookReviewsList";
import UserBooksList from "./components/UserBooksList";
import MyReviewsList from "./components/MyReviewsList";
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
  const [users, setUsers] = useState([]);

  // Fetches books data (containing reviews for each book) from backend server & sets state with that data.
  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      //   .then((data) => console.log(data));
      .then((data) => setBooks(data));
  }, []);

  // console.log(books);

  // Fetches users data (containing books) from backend server & sets state with that data.
  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      // .then((data) => console.log(data));
      .then((data) => setUsers(data));
  }, []);

  // console.log(users);

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

    // update logged in user state with new review. if user navigates to My Reviews page after posting a new review, the new review will be displayed without having to refresh the page.
    const updateUser = { ...user, reviews: [...user.reviews, newReview] };

    // console.log(updateBooks);
    setBooks(updateBooks);

    // console.log(updateUser);
    setUser(updateUser);
  }

  function handleDeleteReview(deletedReview) {
    // console.log("handle delete Review", deletedReview);

    // update logged in user state without the deleted review so it's no longer displayed on My Reviews page.
    // set state by creating a new array in which the deleted item has been filtered out
    const updateUser = {
      ...user,
      reviews: user.reviews.filter((review) => review.id !== deletedReview.id),
    };

    // map over books. if the book id matches the deleted review's foreign key for book id, it will copy the book and filter down the book's reviews to those whose id don't match the deleted review's id.
    const updateBooks = books.map((book) => {
      if (book.id === deletedReview.book_id) {
        return {
          ...book,
          reviews: book.reviews.filter(
            (review) => review.id !== deletedReview.id
          ),
        };
      }
      return book;
    });

    // console.log(updateUser);
    setUser(updateUser);

    // console.log(updateBooks);
    setBooks(updateBooks);
  }

  function handleEditReview(editReview) {
    // console.log("In ReviewsList:", editReview);

    // map over all books. if the book id matches edited review's foreign key for book id, it'll replace existing review as long as the review id matches the id of the review being edited.
    const updateBooks = books.map((book) => {
      if (book.id === editReview.book_id) {
        return {
          ...book,
          reviews: book.reviews.map((review) => {
            if (review.id === editReview.id) {
              return editReview;
            }
            return review;
          }),
        };
      }
      return book;
    });

    // update logged in user state with the edited review
    // create a new updateUser object that copies the user state and replaces the old review object with the updated review object in the reviews array using the map function.
    const updateUser = {
      ...user,
      reviews: user.reviews.map((review) => {
        if (review.id === editReview.id) {
          return editReview;
        }
        return review;
      }),
    };

    setUser(updateUser);
    // console.log(updateUser);

    setBooks(updateBooks);
    // console.log(updateBooks);
  }

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
              <BookReviewsList books={books} onAddReview={handleAddReview} />
            }
          />
          <Route path="/users/:id" element={<UserBooksList users={users} />} />
          {/* if user is truthy, && operator returns the route so a user that's logged in can see their reviews list */}
          {user && (
            <Route
              path="/my-reviews"
              element={
                <MyReviewsList
                  onDeleteReview={handleDeleteReview}
                  onEditReview={handleEditReview}
                />
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
