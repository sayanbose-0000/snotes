import '../styles/errorpage.css';
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorpage">
      <h2>Error!!</h2>
      <p>Please check the url you have entered</p>
      <Link to='/'>Go to Home</Link>
    </div>
  );
};

export default ErrorPage;