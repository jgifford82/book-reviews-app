import { useState } from "react";
import SignUpForm from "./SignUpForm";

const SignUpPage = ({ onLogin }) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [success, setSuccess] = useState(false);

  // button sets showSignUpForm state to true so it affects conditional rendering below
  const button = (
    <button onClick={() => setShowSignUpForm(true)}>Sign Up</button>
  );
  const noAccount = <div>Don't have an account? {button}</div>;
  const successText = (
    <h1 style={{ color: "green" }}>Sign up successful! Please log in</h1>
  );

  return (
    <div>
      {/* conditional rendering of text & button depending on whether or not a user is signed up */}
      {success ? successText : noAccount}
      {/* conditional rendering of sign up form to appear when a user clicks the button */}
      {showSignUpForm ? (
        <SignUpForm
          setSuccess={setSuccess}
          setShowSignUpForm={setShowSignUpForm}
          onLogin={onLogin}
        />
      ) : null}
    </div>
  );
};

export default SignUpPage;
