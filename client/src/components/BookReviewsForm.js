import { useState } from "react";

const BookReviewsForm = () => {
  // State sets default form textarea value as empty string.
  const [postContent, setPostContent] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <div>
      <br></br>
      <form>
        <label>
          Add a review:
          <textarea
            // force the input's value to match the state variable
            value={postContent}
            //update the state variable on any edits
            onChange={(e) => {
              setPostContent(e.target.value);
              //   console.log(postContent);
            }}
          />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default BookReviewsForm;
