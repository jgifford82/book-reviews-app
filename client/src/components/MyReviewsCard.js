import { useContext } from "react";
import { UserContext } from "../context/user";

const MyReviewsCard = ({ onDeleteClick }) => {
  // user variable from UserContext allows access to the list of logged in user's books & reviews
  const { user } = useContext(UserContext);
  console.log(user);

  // Map through user's reviews to render each review comment & book title. Display a delete button next to each review.
  const renderUserReviewedBooks = user.reviews.map((review) => {
    return (
      <div key={review.id}>
        <h3>{review.book.title}</h3>
        <button onClick={(e) => onDeleteClick(e, review)}>X</button>{" "}
        <span>{review.comment}</span>
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
