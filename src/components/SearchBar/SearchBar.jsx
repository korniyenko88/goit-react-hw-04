import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const hendleSubmit = event => {
    event.preventDefault();
    onSearch(inputValue.trim());
    setInputValue("");
  };
  return (
    <div className={styles.searchWraper}>
      <header>
        <form className={styles.seachForm} onSubmit={hendleSubmit}>
          <input
            className={styles.searchInput}
            type="text"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
