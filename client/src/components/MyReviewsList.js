import MyReviewsCard from "./MyReviewsCard";
import { useState } from "react";

const MyReviewsList = ({ onDeleteReview }) => {
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
        // r.json().then((data) => console.log(data));
        r.json().then((deletedReview) => onDeleteReview(deletedReview));
      } else {
        // r.json().then((err) => console.log(err));
        r.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <div>
      {/* if there's an error, display it in red */}
      {errors ? <h3 style={{ color: "red" }}>{errors}</h3> : null}
      <MyReviewsCard onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default MyReviewsList;
