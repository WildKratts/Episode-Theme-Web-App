import React, { useEffect, useState } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import axios from 'axios';

    function EpisodeDetails() {
      const { id } = useParams(); // Get the episode ID from the URL
      const [episode, setEpisode] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        // Fetch all episodes and find the one that matches the internal episode number
        axios.get('https://wildkratts.com/wp-json/wild-kratts/v1/episodes')
          .then(response => {
            const foundEpisode = response.data.find(ep => ep['Episode Number (Internal)'] === parseInt(id, 10));
            if (foundEpisode) {
              setEpisode(foundEpisode);
            } else {
              setError('Episode not found.');
            }
            setLoading(false);
          })
          .catch(error => {
            setError('Failed to fetch episode details. Please try again later.');
            setLoading(false);
          });
      }, [id]);

      return (
        <div>
          <Link to="/">Back to Episodes</Link>
          {loading ? (
            <p>Loading episode details...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : episode ? (
            <div>
              <h2>{episode['Episode Title']}</h2>
              <p>Season {episode.Season}, Episode {episode['Episode Number (Broadcast Order)']}</p>
              <p>Air Date: {episode['Air Date']}</p>
              {/* Add more detailed information here if available */}
            </div>
          ) : (
            <p>Episode not found.</p>
          )}
        </div>
      );
    }

    export default EpisodeDetails;
