import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUp from "./SignUp";

const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <h1>Log in to view & post book reviews!</h1>
      <br></br>
      <LogInForm />
      <br></br>
      <br></br>
      Don't have an account?{" "}
      {/* button sets showSignUp state to true so it affects conditional rendering below*/}
      <button onClick={() => setShowSignUp(true)}>Sign Up</button>
      {/* conditional rendering of sign up form to appear when a user clicks the button */}
      {showSignUp ? <SignUp /> : null}
    </div>
  );
};

export default Home;
