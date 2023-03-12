import BookReviewsForm from "./BookReviewsForm";
import { Link, useParams } from "react-router-dom";

const BookReviewsList = ({ books }) => {
  // console.log(books);

  // useParams returns object with key/value pairs. destructured the id value to use it in foundBook variable
  // commented out destructured id variable to clear warning in browser console that id variable wasnt being used
  // const { id } = useParams();
  const params = useParams();
  // console.log({ id });

  // find all reviews with book id that equals the params id, which had to be converted from string to number using parseInt.
  const foundBook = books.find(({ id }) => id === parseInt(params.id));
  // console.log(foundBook);
  console.log(foundBook.reviews);

  const renderReviews = foundBook.reviews.map((review) => (
    <li key={review.id}>
      <span style={{ fontWeight: "bold" }}>
        <Link to={`/users/${review.user.id}`}>{review.user.username}:</Link>
      </span>{" "}
      "{review.comment}"
    </li>
  ));

  return (
    <div>
      <BookReviewsForm />
      <h1>
        Reviews for
        <br></br>
        <em>{foundBook.title}</em>
      </h1>
      <h3>Genre: {foundBook.genre}</h3>
      {renderReviews}
    </div>
  );
};

export default BookReviewsList;
