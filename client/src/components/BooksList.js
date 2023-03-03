import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      //   .then((data) => console.log(data));
      .then((data) => setBooks(data));
  }, []);

  console.log(books);

  const renderBooks = books.map((book) => (
    <ul key={book.id}>
      <em>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </em>{" "}
      by {book.author}
      <br></br>
      Genre: {book.genre}
    </ul>
  ));
  return <div>Books!!!{renderBooks}</div>;
};

export default BooksList;
