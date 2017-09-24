import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Step from './step';

import './index.css';

class Presentation extends Component {

  static propTypes = {
    
  };
  
  constructor(props) {
    super(props);

    this.state = {
      workshop: null,
      activeStep: 0,
      status: 'WORKING'
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.workshop)) {
      const { match: { params: { organizerId, workshopId } } } = nextProps; 
      this.setState({
        workshop: nextProps.workshop.organizers[organizerId].workshops[workshopId]
      });
    }
  }
  
  onClick = () => {
    const { activeStep, status } = this.state;
    if (status === 'WORKING') {
      this.setState({
        status: 'COMPLETE'
      });
    } else if (status === 'COMPLETE') {
      this.setState({
        activeStep: activeStep + 1
      });
    }
  }

  render() {
    const { workshop, activeStep, status } = this.state;
    
    if (!workshop) {
      return <div></div>
    };
    
    const { steps } = workshop;
    return (
      <div className="presentation">
        <div className="presentation-header">{workshop.header}</div>
        <div className="current-step">{ activeStep + 1 } of { steps.length }</div>
        <div className="action" onClick={this.onClick}>{status === 'WORKING' ? 'Complete' : 'Next Step'}</div>
        <Step step={steps[activeStep]} />
      </div>
    );
  }

}

const wrapped = firebaseConnect(() => ([
  'organizers/acm/workshops/23423d'
]))(Presentation)

export default connect(
  ({ firebase: { data } }) => ({
    workshop: data,
  })
)(wrapped)