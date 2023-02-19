import React, { useState } from "react";

const SignUp = () => {
  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
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

  function handleSubmit(e) {
    // prevent page refresh on submit:
    e.preventDefault();
    console.log("submitted");
    console.log(values);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));

    // clear input fields on submit by updating values state:
    setValues(initialValues);
  }

  return (
    <div>
      <em>SignUp Component</em>
      <form onSubmit={handleSubmit}>
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
        <br></br>
        <label>
          Password (must be 2-8 characters){" "}
          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          ></input>
        </label>
        <br></br>
        <label>
          Confirm Password{" "}
          <input
            type="password"
            name="passwordConfirmation"
            autoComplete="on"
            placeholder="must match password"
            value={values.passwordConfirmation}
            onChange={handleInputChange}
          ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
