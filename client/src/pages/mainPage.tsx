import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <>
      <h1>Main Page</h1>

      <ul>
        <li>
          <Link to="/upload">image upload</Link>
        </li>

        <li>
          <Link to="/portfolios">my portfolios</Link>
        </li>
      </ul>

      <Link to="/login">
        <button>Sign In</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </>
  );
}
