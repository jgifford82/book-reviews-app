import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import MyReviewsEditForm from "./MyReviewsEditForm";

const MyReviewsCard = ({ onDeleteClick, onEditReview }) => {
  // user variable from UserContext allows access to the list of logged in user's books & reviews
  const { user } = useContext(UserContext);
  // console.log(user);

  // keep track of the review object that is being edited
  const [editingReview, setEditingReview] = useState(null);

  // set the editingReview state to the review object that was clicked, or null if the same edit button is clicked again so the edit form is no longer displayed.
  function handleEditClick(e, review) {
    // console.log("clicked");
    if (editingReview === review) {
      setEditingReview(null);
    } else {
      setEditingReview(review);
    }
    // console.log(editingReview);
  }

  // Map through user's reviews to render each review comment & book title. Display a delete button & edit button next to each review.
  const renderUserReviewedBooks = user.reviews.map((review) => {
    return (
      <div key={review.id}>
        <h3>{review.book.title}</h3>
        <button onClick={(e) => onDeleteClick(e, review)}>X</button>{" "}
        <button onClick={(e) => handleEditClick(e, review)}>Edit</button>{" "}
        <span>{review.comment}</span>
      </div>
    );
  });
  // console.log(renderUserReviewedBooks);

  const renderEditUserReviewedBooks = user.reviews.map((review) => {
    return (
      <div key={review.id}>
        <h3>{review.book.title}</h3>
        <button onClick={(e) => onDeleteClick(e, review)}>X</button>{" "}
        <button onClick={(e) => handleEditClick(e, review)}>Edit</button>
        {editingReview && editingReview.id === review.id ? (
          <MyReviewsEditForm
            review={editingReview}
            onEditReview={onEditReview}
            onEditClick={handleEditClick}
          />
        ) : (
          <span>{review.comment}</span>
        )}
      </div>
    );
  });

  return (
    <div>
      My Reviews:
      {/* conditional rendering shows edit form when editingReview state is set to a review object */}
      {editingReview ? (
        <>{renderEditUserReviewedBooks}</>
      ) : (
        <>{renderUserReviewedBooks}</>
      )}
    </div>
  );
};

export default MyReviewsCard;
