import React, { useState } from "react";

const SignUp = () => {
  const initialValues = {
    username: "",
    password: "",
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
      <em>SignUp Component</em>
      <form>
        <label>
          Username (minimum 2 characters){" "}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleInputChange}
          ></input>
        </label>
        <label>
          Password (must be 2-8 characters){" "}
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
