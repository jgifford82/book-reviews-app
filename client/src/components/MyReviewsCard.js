import { useContext } from "react";
import { UserContext } from "../context/user";

const MyReviewsCard = () => {
  // user variable from UserContext allows access to the list of logged in user's books & reviews
  const { user } = useContext(UserContext);
  console.log(user);

  // Map through user's reviews to render each review comment book title where the title matches the review's book id.
  const renderUserReviewedBooks = user.reviews.map((review) => {
    const bookTitle = user.books.find(
      (book) => book.id === review.book_id
    ).title;
    return (
      <div key={review.id}>
        <h3>{bookTitle}</h3>
        <p>{review.comment}</p>
      </div>
    );
  });
  // console.log(renderUserReviewedBooks);

  return (
    <div>
      My Reviews:
      {renderUserReviewedBooks}
    </div>
  );
};

export default MyReviewsCard;
