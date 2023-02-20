import React from "react";
import LogInForm from "./LogInForm";

const Home = () => {
  return (
    <div>
      <h1>Book Reviews</h1>
      Log in to view & post book reviews!
      <br></br>
      <LogInForm />
      <br></br>
      <br></br>
      Don't have an account? <em>Sign Up button</em>
    </div>
  );
};

export default Home;
