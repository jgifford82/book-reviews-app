import { useParams } from "react-router-dom";

const UserBooksList = ({ users }) => {
  // console.log(users);

  // useParams pulls the user ID from the URL & returns object with key/value pairs.
  const params = useParams();
  // console.log(params);
  // console.log(params.id);
  // params.id data type is string
  // console.log(typeof params.id);

  // find all books with user id that equals the params id, which had to be converted from string to number using parseInt.
  const foundUser = users.find(({ id }) => id === parseInt(params.id));
  // console.log(foundUser);

  // create a list of all books that the user has reviewed
  // The question mark in foundUser?.books.map is the optional chaining operator. It allows safe access to nested properties or methods of an object without causing an error if the object is null or undefined, which prevents errors the first time navigating to the page if users hasn't loaded yet.
  // map over foundUser.books and return elements containing book id key, title, author, and genre
  const renderReviewedBooks = foundUser?.books.map((book) => (
    <ul key={book.id}>
      <h3>{book.title}</h3>
      by {book.author}
      <br></br>
      Genre: {book.genre}
    </ul>
  ));

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
