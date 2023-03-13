import { useState } from "react";
import { useParams } from "react-router-dom";

const BookReviewsForm = ({ onAddReview }) => {
  // State sets default form textarea value as empty string.
  const [postContent, setPostContent] = useState("");
  const [errors, setErrors] = useState([]);

  // useParams returns object with key/value pairs. destructured the id value to use it in bookId variable
  const { id } = useParams();
  //   console.log({ id });

  // id is converted from object with key/value pair to an integer so it can be used in the fetch POST below
  const bookId = parseInt(id);
  //   console.log(bookId);

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    // console.log("submitted");
    // console.log(postContent);

    // specifies the key/value pair being submitted
    const review = {
      comment: postContent,
    };

    fetch(`/books/${bookId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   stringify the review hash containing comment/postContent key/value pair
      body: JSON.stringify(review),
    }).then((r) => {
      if (r.ok) {
        setErrors([]);
        // r.json().then((data) => console.log(data));
        r.json().then((newReview) => onAddReview(newReview));
      } else {
        // console log shows errors as an array:
        // r.json().then((err) => console.log(err));
        // sets errors state with error messages if response is not ok
        r.json().then((err) => setErrors(err.errors));
      }
    });

    // clear input fields on submit by updating postContent state:
    setPostContent("");
  }

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit}>
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
      {/* if there are errors, display them in red */}
      {errors.map((err) => (
        <li style={{ color: "red" }} key={err}>
          {err}
        </li>
      ))}
    </div>
  );
};

export default BookReviewsForm;
