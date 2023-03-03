import { useState } from "react";

const BooksForm = () => {
  const initialValues = {
    title: "",
    author: "",
    genre: "",
  };

  // State sets default form input value as object with empty strings.
  const [values, setValues] = useState(initialValues);

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

  return (
    <div>
      <form>
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
    </div>
  );
};

export default BooksForm;
