import { useState } from "react";
import axios from "axios";
import Result from "./Result";
import { Fragment } from "react";

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);

  const searchHandler = async (e) => {
    e.preventDefault();
    setResults([]);
    if (!searchQuery) {
      return;
    }
    setResponse(true);
    setLoading(true);

    try {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${searchQuery}`);
      const characters = response.data.results;
      await setAttributes(characters);
    } catch (error) {
      console.error("Error in searchResponse:", error);
    }
  };

  const setAttributes = async (characters) => {
    try {
      const promises = characters.map(async (character) => {
        character.homeworld = await getHomeWorld(character.homeworld);
        character.species = await getSpecies(character.species);
        return character;
      });

      const updatedCharacters = await Promise.all(promises);

      setResults(updatedCharacters);
      setLoading(false);

      if (updatedCharacters.length === 0) {
        setResponse(false);
      } else {
        setResponse(true);
      }
    } catch (error) {
      console.error("Error in setAttributes:", error);
    }
  };

  const getHomeWorld = async (homeworld) => {
    try {
      const response = await axios.get(homeworld);
      return response.data.name;
    } catch (error) {
      console.error("Error in getHomeWorld:", error);
      return "Unknown";
    }
  };

  const getSpecies = async (species) => {
    try {
      const response = await axios.get(species);
      return response.data.name || "Human";
    } catch (error) {
      console.error("Error in getSpecies:", error);
      return "Human";
    }
  };

  return (
    <Fragment>
      <form onSubmit={searchHandler}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Character.."
            type="text"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
      {!response && <p>No Results</p>}
      {loading && <p>Searching..</p>}
      {results.length > 0 && <Result character={results} />}
    </Fragment>
  );
};

export default Search;