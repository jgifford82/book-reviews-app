import MyReviewsCard from "./MyReviewsCard";
import { useContext, useState } from "react";
import { UserContext } from "../context/user";

const MyReviewsList = (onDeleteReview) => {
  const { user } = useContext(UserContext);
  console.log(user);

  const [errors, setErrors] = useState([]);

  function handleDeleteClick(e, review) {
    // book & review id's taken from the review object argument passed into the function
    const bookId = review.book_id;
    const reviewId = review.id;

    fetch(`/books/${bookId}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        setErrors([]);
        r.json().then((data) => console.log(data));
        // r.json().then((deletedReview) => onDeleteReview(deletedReview));
      } else {
        r.json().then((err) => console.log(err));
        // r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <MyReviewsCard onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default MyReviewsList;
