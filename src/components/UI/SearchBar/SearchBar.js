import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import { useHistory } from 'react-router-dom';

const propTypes ={
  onSearch: PropTypes.func.isRequired
};

function SearchBar(props) {
  const [term, setTerm] = useState('');
  const theme = useContext(ThemeContext);
  const inputRef = useRef(null)
  const history = useHistory()

  const search = () => {
    history.push(`/wyszukaj/${term}`);
  }
  
  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      search();
    }
  }

  const focusInput = () => {
    inputRef.current.focus(); 
  };

  useEffect(() => {
    focusInput()
  }, []);

  return(
    <div className="d-flex">
      <input
        ref={inputRef}
        volue={term}
        onKeyDown={onKeyDownHandler}
        onChange={e => setTerm(e.target.value)}
        className={`form-control ${styles.input}`} 
        type="text" 
        placeholder="Szukaj... " />
        <button 
          onClick={search}
          className={`ml-1 btn btn-${theme.color}`}>
            Szukaj
        </button>
    </div>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;