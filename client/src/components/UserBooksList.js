import { useParams } from "react-router-dom";

const UserBooksList = ({ users }) => {
  console.log(users);

  // useParams pulls the user ID from the URL & returns object with key/value pairs. destructured the id value to use it in variables below
  const { id } = useParams();
  console.log(id);
  // id data type is string
  // console.log(typeof id);
  const params = useParams();

  // find all books with user id that equals the params id, which had to be converted from string to number using parseInt.
  const foundUser = users.find(({ id }) => id === parseInt(params.id));
  console.log(foundUser);

  // create a list of all books that the user has reviewed
  // foundUser && is a conditional check to ensure foundUser exists before trying to access its properties, otherwise don't access it if it's undefined, which prevents errors on page refresh
  // map over foundUser.books and return elements containing book id key, title, author, and genre
  const renderReviewedBooks =
    foundUser &&
    foundUser.books.map((book) => {
      return (
        <ul key={book.id}>
          <h3>{book.title}</h3>
          by {book.author}
          <br></br>
          Genre: {book.genre}
        </ul>
      );
    });

  // Save the username to a variable (if it's found in the foundUser variable above) so it can be displayed, otherwise it's set to an empty string
  // This allows the page to load if it's refreshed, otherwise it will error out since users state might not be loaded yet
  const username = foundUser ? foundUser.username : "";

  return (
    <div>
      {username}'s reviewed books:
      {renderReviewedBooks}
    </div>
  );
};

export default UserBooksList;
