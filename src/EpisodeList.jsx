import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';

    function EpisodeList() {
      const [episodes, setEpisodes] = useState([]);
      const [selectedSeason, setSelectedSeason] = useState(7);
      const [searchTerm, setSearchTerm] = useState('');
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        axios.get('https://wildkratts.com/wp-json/wild-kratts/v1/episodes')
          .then(response => {
            setEpisodes(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError('Failed to fetch episodes. Please try again later.');
            setLoading(false);
          });
      }, []);

      const handleSeasonChange = (event) => {
        setSelectedSeason(Number(event.target.value));
      };

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
      };

      const filteredEpisodes = episodes
        .filter(episode => episode.Season === selectedSeason)
        .filter(episode => episode['Episode Title'].toLowerCase().includes(searchTerm));

      return (
        <div>
          <div className="controls">
            <div className="filter">
              <label htmlFor="season-select">Select Season: </label>
              <select id="season-select" value={selectedSeason} onChange={handleSeasonChange}>
                {[...new Set(episodes.map(episode => episode.Season))].map(season => (
                  <option key={season} value={season}>Season {season}</option>
                ))}
              </select>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {loading ? (
            <p>Loading episodes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul>
              {filteredEpisodes.map(episode => (
                <li key={episode['Episode Number (Internal)']}>
                  <Link to={`/episode/${episode['Episode Number (Internal)']}`}>
                    <h2>{episode['Episode Title']}</h2>
                  </Link>
                  <p>Season {episode.Season}, Episode {episode['Episode Number (Broadcast Order)']}</p>
                  <p>Air Date: {episode['Air Date']}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    export default EpisodeList;
