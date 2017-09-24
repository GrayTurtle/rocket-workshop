import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
const Homepage = (props) => (
  <div className="homepage">
    <div className="img-header">
      <img src={require('./rocket.png')} alt="rocket"/>
    </div>
    <div className="main-text">
      We help you manage your workshops. Keep track of your attendees progress.
    </div>
  </div>
);

Homepage.propTypes = {
  
};

export default Homepage;