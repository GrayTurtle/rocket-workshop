import React, { Component } from 'react';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';
import { ContentState } from 'draft-js';

import './assets/css/step.css';

class Step extends Component {

  static propTypes = {
    
  };
  
  render() {
    const { step: { contentState }} = this.props;
    const html = draftToHtml(typeof contentState === 'string' ? JSON.parse(contentState) : contentState);
    return (
      <div className="presentation-step" dangerouslySetInnerHTML={{__html: html}} />
    );
  }

}

Step.defaultProps = {
  step: ContentState.createFromText('')
}

export default Step;