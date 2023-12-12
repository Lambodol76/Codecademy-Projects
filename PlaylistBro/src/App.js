import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";

const CLIENT_ID = "c16a163a17d34939aabb8111eb28f274"; // no problem
const redirectUri = "http://localhost:3000/";

function App() {
  const [accessToken, setAccessToken] =
    useState(""); /* set a variable accessToken to save our token*/
  const [playlistName, setPlaylistName] = useState("");
  const [searchResultsArr, setSearchResultsArr] = useState([]);
  const [savedResultsArr, setSavedResultsArr] = useState([]);

  const getAccessToken = () => {
    //check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch) {
      setAccessToken(accessTokenMatch[1]);
      //This clears the parameters, allowing to grab new access token then it expires
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const handleAdditionToPlaylist = (id) => {
    const additionalObjectArr = searchResultsArr.filter(
      (item) => item.id === id
    );
    setSavedResultsArr((prev) => [...prev, additionalObjectArr[0]]);
  };

  const handleRemoveFromPlaylist = (id) => {
    const removeableObjectArr = savedResultsArr.filter(
      (item) => item.id !== id
    );
    setSavedResultsArr(removeableObjectArr);
  };

  const searchResults = searchResultsArr.map((res) => (
    <div className="result">
      <div className="artist-details">
        <h3>{res.name}</h3>
        <p>
          {res.artists[0].name} | {res.album.name}
        </p>
      </div>
      <div className="previewRnA-btn">
        <button type="button" onClick={() => handleAdditionToPlaylist(res.id)}>
          +
        </button>
      </div>
    </div>
  ));

  const savedResults = savedResultsArr.map((res) => (
    <div className="result">
      <div className="artist-details">
        <h3>{res.name}</h3>
        <p>
          {res.artists[0].name} | {res.album.name}
        </p>
      </div>
      <div className="preview-btn"></div>
      <div className="previewRnA-btn">
        <button type="button" onClick={() => handleRemoveFromPlaylist(res.id)}>
          -
        </button>
      </div>
    </div>
  ));

  const search = async (value) => {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    let searchResultsObjectsArr = await fetch(
      "https://api.spotify.com/v1/search?q=" + value + "&type=track&limit=7",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.tracks.items;
      });
    setSearchResultsArr(searchResultsObjectsArr);
    console.log(searchResultsArr);
  };

  const handleSaveToSpotify = async () => {
    const tracksUri = savedResultsArr.map((track) => track.uri);
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch("https://api.spotify.com/v1/me", { headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ name: playlistName }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ uris: tracksUri }),
              }
            );
          });
      });
    const playlistId = await response.text();
    alert("Playlist has been saved successfully!");
  };

  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  return (
    <div className="App">
      <Header />
      <SearchBar value="" searchFunction={search} />
      <SearchResults
        handleSaveFunc={searchResults}
        handleDeleteFunc={savedResults}
        saveToSpotify={handleSaveToSpotify}
        handlePlaylistName={setPlaylistName}
        value={playlistName}
      />
    </div>
  );
}

export default App;
