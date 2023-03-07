import { useParams } from "react-router-dom";

const BookReviewsList = ({ books }) => {
  // console.log(books);

  // useParams returns object with key/value pairs. destructured the id value to use it in foundBook variable
  const { id } = useParams();
  const params = useParams();
  // console.log({ id });

  // find all reviews with book id that equals the params id, which had to be converted from string to number using parseInt.
  const foundBook = books.find(({ id }) => id === parseInt(params.id));
  // console.log(foundBook);
  // console.log(foundBook.reviews);

  const renderReviews = foundBook.reviews.map((review) => (
    <li key={review.id}>{review.comment}</li>
  ));

  return (
    <div>
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
