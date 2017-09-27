import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left'; 
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';   

import Step from './step';
import './assets/css/present.css';

class Present extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      workshop: null,
      activeStep: 0,
      status: 'WORKING',
      mode: 'PRESENT'
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.workshop)) {
      const { match: { params: { organizerId, workshopId } } } = nextProps; 
      const workshop = nextProps.workshop.organizers[organizerId].workshops[workshopId];
      if (!workshop.steps) { 
        workshop.steps = [];
      }
      this.setState({
        workshop,
        activeStep: workshop.step,
        status: workshop.status
      });
    }
  }
  
  onClick = () => {
    const { activeStep, status, workshop: { steps } } = this.state;
    const { firebase } = this.props;
    if (status === 'WORKING') {
      this.setState({
        status: 'COMPLETE'
      }, () => {
         firebase.set('organizers/acm/workshops/23423d/status', 'COMPLETE');
      });
    } else if (status === 'COMPLETE') {
      if (activeStep + 1 === steps.length) return;
      this.setState({
        activeStep: activeStep + 1,
        status: 'WORKING'
      }, () => {
         firebase.set('organizers/acm/workshops/23423d/step', activeStep + 1);
         firebase.set('organizers/acm/workshops/23423d/status', 'WORKING');
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
  
  toggleMode = () => {
    const { mode } = this.state;
    if(mode === 'PRESENT') {
      this.setState({
        mode: 'GODMODE'
      });
    } else if (mode === 'GODMODE') {
      this.setState({
        mode: 'PRESENT'
      });
    }
  }
  
  render() {
    const { workshop, status, activeStep } = this.state;
    const { match: { params: { workshopId, organizerId } } } = this.props;
    if (isEmpty(workshop)) return <div></div>;

    return (
    <div className="presentation">
      <Link className="toggle-mode" to={`/organizer/${organizerId}/workshops/${workshopId}/present/godmode`}>View attendees</Link>
      <div className="presentation-header">{workshop.title}</div>
      <div className="presentation-toolbar">
        <div className="back" onClick={this.goBack}>
          <Icon size={18} icon={ic_keyboard_arrow_left} />
        </div>
        {workshop.steps && workshop.steps.length > 0 && <div className="current-step">{ activeStep + 1 } of { workshop.steps.length }</div>}
        <div className="back" onClick={this.goFoward}>
          <Icon size={18} icon={ic_keyboard_arrow_right} />
        </div>
        <div className={`action ${status.toLowerCase()}`} onClick={this.onClick}>{status === 'WORKING' ? 'Complete' : 'Next Step'}</div>
      </div>
      {workshop.steps && workshop.steps.length > 0 && <Step step={workshop.steps[activeStep]} />}
    </div>
  );

  }
}

const wrapped = firebaseConnect(({ match: { params }}) => ([
  `/organizers/${params.organizerId}/workshops/${params.workshopId}`
]))(Present);

export default connect(
  ({ firebase: { data }}) => ({ workshop: !isEmpty(data) && data })
)(wrapped);