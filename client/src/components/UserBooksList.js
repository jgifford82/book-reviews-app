import { useParams } from "react-router-dom";

const UserBooksList = ({ books }) => {
  // useParams pulls the user ID from the URL & returns object with key/value pairs. destructured the id value to use it in variables below
  const { id } = useParams();

  // filter books to find those that the user has reviewed
  // filters books list to those where reviews contain the user id matching params
  const userReviews = books.filter((book) =>
    book.reviews.find((review) => review.user_id === parseInt(id))
  );
  // console.log(userReviews);

  // create a list of all books that the user has reviewed
  // within book reviews, find a review where the user id matches the id in params, & save to userReview variable
  // map over userReviews above and return elements containing book id key, book title, and user's comment
  const renderReviewedBooks = userReviews.map((book) => {
    const userReview = book.reviews.find(
      (review) => review.user_id === parseInt(id)
    );
    return (
      <div key={book.id}>
        <h3>{book.title}</h3>
        <p>{userReview.comment}</p>
      </div>
    );
  });

  // Find the user object that matches the id parameter
  // flatMap flattens the array of reviews in each book object into a single array of review objects which makes it easier to map through reviews
  // find method locates the user object within the reviews array with the matching id parameter that's converted to an integer
  const user = books
    .flatMap((book) => book.reviews.map((review) => review.user))
    .find((user) => user.id === parseInt(id));

  // Save the username to a variable (if it's found in the user variable above) so it can be displayed, otherwise it's set to an empty string
  // This allows the page to load if it's refreshed, otherwise it will error out since books state might not be loaded yet
  const username = user ? user.username : "";

  return (
    <div>
      {username}'s reviewed books: {renderReviewedBooks}
    </div>
  );
};

export default UserBooksList;
