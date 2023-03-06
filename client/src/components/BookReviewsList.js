import { useParams } from "react-router-dom";

const BookReviewsList = ({ books }) => {
  console.log(books);

  // useParams returns object with key/value pairs. destructured the id value to use it in foundBook variable
  const { id } = useParams();
  const params = useParams();
  console.log({ id });

  return <div>BookReviewsList</div>;
};

export default BookReviewsList;
