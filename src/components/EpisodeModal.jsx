import React from 'react';

    function EpisodeModal({ episode, onClose }) {
      const streamingServices = [
        {
          name: 'PBS KIDS',
          icon: '🎯',
          color: '#00A0E0'
        },
        {
          name: 'Netflix',
          icon: '📺',
          color: '#E50914'
        },
        {
          name: 'TVO KIDS',
          icon: '🌟',
          color: '#4C9CD5'
        },
        {
          name: 'Knowledge Network',
          icon: '🎓',
          color: '#005DA6'
        },
        {
          name: 'Amazon Prime Video',
          icon: '🎬',
          color: '#00A8E1'
        }
      ];

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>
            
            <div className="modal-image">
              <img 
                src="https://www.wildkratts.com/wp-content/uploads/2024/03/705_Gang_w_WildCamels0009.png" 
                alt={episode['Episode Title']} 
              />
            </div>

            <div className="modal-details">
              <h2>{episode['Episode Title']}</h2>
              <p className="episode-info">
                Season {episode.Season}, Episode {episode['Episode Number (Broadcast Order)']}
              </p>
              <p className="episode-date">Original Air Date: {episode['Air Date']}</p>

              <div className="streaming-section">
                <h3>Watch On:</h3>
                <div className="streaming-links">
                  {streamingServices.map(service => (
                    <a 
                      key={service.name}
                      href="#" 
                      className="streaming-link"
                      style={{'--service-color': service.color}}
                    >
                      <span className="service-icon">{service.icon}</span>
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default EpisodeModal;
