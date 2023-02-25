import LogInForm from "./LogInForm";
import SignUpPage from "./SignUpPage";

const Home = () => {
  return (
    <div>
      <h1>Log in to view & post book reviews!</h1>
      <br></br>
      <LogInForm />
      <br></br>
      <br></br>
      <SignUpPage />
    </div>
  );
};

export default Home;
