import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <div className="content-wrapper">
        <h1>404</h1>
        <p>Oops! Strona, której szukasz, nie istnieje.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;