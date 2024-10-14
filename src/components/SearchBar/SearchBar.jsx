import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchWraper}>
      <header>
        <form className={styles.seachForm}> 
          <input className={styles.searchInput}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
          <button className={styles.searchBtn} type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
