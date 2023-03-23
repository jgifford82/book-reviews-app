import { useState } from "react";

const MyReviewsEditForm = ({ review, onEditClick, onEditReview }) => {
  const [errors, setErrors] = useState([]);

  const reviewId = review.id;
  // console.log(reviewId);
  const bookId = review.book_id;
  // console.log(bookId);

  // captures original review comment
  const initialValues = {
    comment: review.comment,
  };
  // console.log(initialValues);

  // controlled edit form for review comment
  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    // console.log(values);
  };

  // State sets default form input values as object with existing values. That way, if any inputs aren't updated, they don't get changed to empty strings on submit.
  const [values, setValues] = useState(initialValues);
  // console.log(values);

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    // console.log("submitted");
    // console.log(values);
    // console.log(reviewId);
    // console.log(bookId);

    fetch(`/books/${bookId}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => {
        if (r.ok) {
          setErrors([]);
          return r.json();
        } else {
          r.json().then((err) => setErrors(err.error));
        }
      })
      .then((editReview) => {
        onEditReview(editReview);
        onEditClick();
      });
  }

  return (
    <div>
      {/* if there's an error, display it in red */}
      {errors ? <h3 style={{ color: "red" }}>{errors}</h3> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          placeholder={review.comment}
          value={values.comment}
          onChange={handleInputChange}
        />
        <input type="submit" value="Submit Changes" />
      </form>
    </div>
  );
};

export default MyReviewsEditForm;
