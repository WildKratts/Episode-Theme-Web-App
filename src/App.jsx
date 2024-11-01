import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import EpisodeModal from './components/EpisodeModal';

    function App() {
      const [episodes, setEpisodes] = useState([]);
      const [selectedSeason, setSelectedSeason] = useState(7);
      const [searchTerm, setSearchTerm] = useState('');
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selectedEpisode, setSelectedEpisode] = useState(null);

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
        <div className="app">
          <h1>Wild Kratts Episodes</h1>
          <div className="controls">
            <div className="filter">
              <label htmlFor="season-select">Select Season:</label>
              <select id="season-select" value={selectedSeason} onChange={handleSeasonChange}>
                {[...new Set(episodes.map(episode => episode.Season))].map(season => (
                  <option key={season} value={season}>Season {season}</option>
                ))}
              </select>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search episodes..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {loading ? (
            <div className="loading">Loading episodes...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="episodes-grid">
              {filteredEpisodes.map(episode => (
                <div 
                  key={episode['Episode Number (Internal)']} 
                  className="episode-card"
                  onClick={() => setSelectedEpisode(episode)}
                >
                  <div className="episode-image">
                    <img 
                      src="https://www.wildkratts.com/wp-content/uploads/2024/03/705_Gang_w_WildCamels0009.png" 
                      alt={episode['Episode Title']} 
                    />
                  </div>
                  <div className="episode-content">
                    <h2>{episode['Episode Title']}</h2>
                    <p className="episode-info">
                      Season {episode.Season}, Episode {episode['Episode Number (Broadcast Order)']}
                    </p>
                    <p className="episode-date">Air Date: {episode['Air Date']}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedEpisode && (
            <EpisodeModal 
              episode={selectedEpisode} 
              onClose={() => setSelectedEpisode(null)} 
            />
          )}
        </div>
      );
    }

    export default App;
