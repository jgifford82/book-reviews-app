import BookReviewsForm from "./BookReviewsForm";
import { Link, useParams } from "react-router-dom";

const BookReviewsList = ({ books, onAddReview }) => {
  // console.log(books);

  // useParams returns object with key/value pairs. destructured the id value to use it in foundBook variable
  // commented out destructured id variable to clear warning in browser console that id variable wasnt being used
  // const { id } = useParams();
  const params = useParams();
  // console.log({ id });

  // find all reviews with book id that equals the params id, which had to be converted from string to number using parseInt.
  const foundBook = books.find(({ id }) => id === parseInt(params.id));
  // console.log(foundBook);
  // console.log(foundBook.reviews);

  // foundBook && is a conditional check to ensure foundBook exists before trying to access its properties, otherwise don't access it if it's undefined, which prevents errors on page refresh
  const renderReviews =
    foundBook &&
    foundBook.reviews.map((review) => (
      <li key={review.id}>
        <span style={{ fontWeight: "bold" }}>
          <Link to={`/users/${review.user.id}`}>{review.user.username}:</Link>
        </span>{" "}
        "{review.comment}"
      </li>
    ));

  return (
    <div>
      <BookReviewsForm onAddReview={onAddReview} />
      <h1>
        Reviews for
        <br></br>
        {/* Conditional rendering of title & genre allows the page to load if it's refreshed, otherwise it will error out since books state might not be loaded yet*/}
        <em>{foundBook ? foundBook.title : ""}</em>
      </h1>
      <h3>Genre: {foundBook ? foundBook.genre : ""}</h3>
      {renderReviews}
    </div>
  );
};

export default BookReviewsList;
