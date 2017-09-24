import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Step from './step';
import Icon from 'react-icons-kit';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left'; 
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';       

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
        activeStep: activeStep + 1,
        status: 'WORKING'
      });
    }
  }
  
  goBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep  > 0 ? activeStep - 1 : 0,
    });
  }
  
  goFoward = () => {
    const { activeStep, workshop: { steps } } = this.state;
    this.setState({
      activeStep: activeStep < steps.length - 1 ? activeStep + 1 : activeStep,
    });
  }

  render() {
    const { workshop, activeStep, status } = this.state;
    
    if (!workshop) {
      return <div></div>
    };
    
    const { steps } = workshop;
    return (
      <div className="presentation">
        <div className="presentation-header">{workshop.title}</div>
        <div className="presentation-toolbar">
          <div className="back" onClick={this.goBack}>
            <Icon size={18} icon={ic_keyboard_arrow_left} />
          </div>
          <div className="current-step">{ activeStep + 1 } of { steps.length }</div>
          <div className="back" onClick={this.goFoward}>
            <Icon size={18} icon={ic_keyboard_arrow_right} />
          </div>
          <div className={`action ${status.toLowerCase()}`} onClick={this.onClick}>{status === 'WORKING' ? 'Complete' : 'Next Step'}</div>
        </div>
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