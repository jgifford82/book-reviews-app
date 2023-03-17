import { useContext } from "react";
import { UserContext } from "../context/user";

const MyReviewsCard = () => {
  // user variable from UserContext allows access to the list of logged in user's books & reviews
  const { user } = useContext(UserContext);
  console.log(user);

  // Map through user's books array and create a new array of book titles
  const bookTitles = user.books.map((book) => book.title);
  // console.log(bookTitles);

  // Map through user's reviews array and create a new object for each review containing the comment and the book title.
  const reviewsWithTitles = user.reviews.map((review) => {
    const bookTitle = user.books.find(
      (book) => book.id === review.book_id
    ).title;
    return { bookTitle: bookTitle, comment: review.comment };
  });
  // console.log(reviewsWithTitles);

  // filter the reviews array to only include reviews for the user's books
  const filteredReviews = reviewsWithTitles.filter((review) =>
    bookTitles.includes(review.bookTitle)
  );
  // console.log(filteredReviews);

  return (
    <div>
      My Reviews:
      {filteredReviews.map((review) => (
        <div key={review.comment}>
          <h3>{review.bookTitle}</h3>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default MyReviewsCard;
