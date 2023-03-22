import { useState } from "react";

const MyReviewsEditForm = ({ onEditClick, onEditReview }) => {
  return (
    <div>
      {/* onSubmit={handleSubmit} */}
      <form>
        <input
          type="text"
          // name="comment"
          // placeholder={event.date}
          // value={values.date}
          // onChange={handleInputChange}
        />
        <input type="submit" value="Submit Changes" />
      </form>
    </div>
  );
};

export default MyReviewsEditForm;
