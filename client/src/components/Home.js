import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const Home = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <div>
      <h1>Log in to view & post book reviews!</h1>
      <br></br>
      <LogInForm />
      <br></br>
      <br></br>
      Don't have an account?{" "}
      {/* button sets showSignUpForm state to true so it affects conditional rendering below*/}
      <button onClick={() => setShowSignUpForm(true)}>Sign Up</button>
      {/* conditional rendering of sign up form to appear when a user clicks the button */}
      {showSignUpForm ? <SignUpForm /> : null}
    </div>
  );
};

export default Home;
