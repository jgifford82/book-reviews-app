import { useState } from "react";

const BooksForm = ({ onAddBook }) => {
  const initialValues = {
    title: "",
    author: "",
    genre: "",
  };

  // State sets default form input value as object with empty strings.
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  // Handles all form inputs with a single onChange handler. Destructured name & value attributes from input fields to reference the key/value pairs when updating state. onChange prop added to each input to call handleInputChange
  const handleInputChange = (e) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    // console.log("submitted");
    // console.log(values);

    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      if (r.ok) {
        setErrors([]);
        r.json().then((newBook) => onAddBook(newBook));
      } else {
        // console log shows errors as an array:
        // r.json().then((err) => console.log(err));
        // sets errors state with error messages if response is not ok
        r.json().then((err) => setErrors(err.errors));
      }
    });

    // clear input fields on submit by updating values state:
    setValues(initialValues);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add new book:</label>
        <input
          type="text"
          name="title"
          placeholder="Book title"
          value={values.title}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={values.author}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={values.genre}
          onChange={handleInputChange}
        ></input>
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

export default BooksForm;
