import { useState } from 'react';
import './topReport.css';
import backspaceIcon from '../../assets/images/keyboard_backspace.png';
import upArrow from '../../assets/images/up-month-arrow.png';
import backArrow from '../../assets/images/back-month-arrow.png';
import { Link } from 'react-router-dom';
import Balance from '../Balance/Balance';

const TopReports = () => {
  const [date, setDate] = useState(new Date());

  const changeMonth = (offset) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + offset); 
    setDate(newDate);
  };

  const formatDate = () => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className='main-top-report-div'>
      <div className='arrow-div'>
        <Link to="/" className='link-arrow-to-home'>
          <img 
            src={backspaceIcon} 
            alt="Back to Main Page Icon" 
            width="24" 
            height="24" 
          />
          <p className='main-report-top-txt'>Main page</p>
        </Link>
      </div>
      <Balance />
      <div className='main-current-period-div'>
        <p className='main-report-top-txt'>
          Current period:
        </p>
        <div className='show-month-div'>
          <button 
            className='change-month-button'
            onClick={() => changeMonth(-1)}
          >
            <img src={backArrow} alt="Previous month" />
          </button>
          <p className='second-page-back-txt'>
            {formatDate()}
          </p>
          <button 
            className='change-month-button'
            onClick={() => changeMonth(1)} 
          >
            <img src={upArrow} alt="Next month" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopReports;
