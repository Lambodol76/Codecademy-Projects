import { useState, useEffect } from "react";
function SearchBar(props) {
  // searchInput holds the song's name.
  const [value, setValue] = useState(props.value);

  return (
    <div>
      <div>
        <input
          type="text"
          className="input-search"
          placeholder="Enter A Song Title"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        ></input>
      </div>
      <div className="search-btn">
        <button
          className="btn"
          type="submit"
          onClick={() => props.searchFunction(value)}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
