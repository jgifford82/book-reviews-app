import LogInForm from "./LogInForm";
import SignUpPage from "./SignUpPage";

const Home = ({ onLogin }) => {
  return (
    <div>
      <br></br>
      <LogInForm onLogin={onLogin} />
      <br></br>
      <br></br>
      <SignUpPage onLogin={onLogin} />
    </div>
  );
};

export default Home;
