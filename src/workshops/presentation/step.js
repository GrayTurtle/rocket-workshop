import React, { Component } from 'react';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';
import './step.css';
class Step extends Component {

  static propTypes = {
    
  };

  render() {
    const { step: { contentState }} = this.props;
    const html = draftToHtml(JSON.parse(contentState));
    return (
      <div className="presentation-step" dangerouslySetInnerHTML={{__html: html}} />
    );
  }

}

export default Step;