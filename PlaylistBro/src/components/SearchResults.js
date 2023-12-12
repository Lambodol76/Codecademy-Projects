function SearchResults(props) {
  function handlePlaylistNameInput(e) {
    props.handlePlaylistName(e.target.value);
  }
  return (
    <div className="container">
      <div className="searchResults">
        <div className="searchResults-title">
          <h2>Results</h2>
        </div>
        <div className="searchResults-actualResults">
          {props.handleSaveFunc}
        </div>
      </div>
      <div className="savedResults">
        <div className="savedResults-input">
          <input
            type="text"
            className="input-search"
            placeholder="Enter Playlist's Name"
            onChange={handlePlaylistNameInput}
            value={props.value}
          ></input>
        </div>
        <div className="savedResults-playlist">{props.handleDeleteFunc}</div>
        <div className="save-to-spotify-btn">
          <button className="btn" onClick={props.saveToSpotify}>
            SAVE TO SPOTIFY
          </button>
        </div>
      </div>
      <h4></h4>
    </div>
  );
}

export default SearchResults;
