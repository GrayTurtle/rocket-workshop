import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left'; 
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';   
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import Step from '../step';
import '../assets/css/present.css';
import './assets/css/AnttendeeView.css';

class AttendeeView extends React.Component {
  
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
      const { match: { params: { organizerId, workshopId, attendeeId } } } = nextProps; 
      const workshop = nextProps.workshop.organizers[organizerId].workshops[workshopId];
      const attendee = workshop.attendee[attendeeId];
      this.setState({
        workshop,
        attendee,
        activeStep: attendee.step,
        status: attendee.status
      });
    }
  }
  
  onClick = () => {
    const { activeStep, status, workshop } = this.state;
    const { firebase, match: { params: { organizerId, workshopId, attendeeId } }  } = this.props;
    if (status === 'WORKING') {
      this.setState({
        status: 'COMPLETE'
      }, () => {
         firebase.set(`organizers/${organizerId}/workshops/${workshopId}/attendee/${attendeeId}/status`, 'COMPLETE');
      });
    } else if (status === 'COMPLETE') {
      if (activeStep + 1 === workshop.steps.length) return;
      this.setState({
        activeStep: activeStep + 1,
        status: activeStep + 1 > workshop.step ? 'ROCKET' : 'WORKING'
      }, () => {
         firebase.set(`organizers/${organizerId}/workshops/${workshopId}/attendee/${attendeeId}/step`, activeStep + 1);
         firebase.set(`organizers/${organizerId}/workshops/${workshopId}/attendee/${attendeeId}/status`, 'WORKING');
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
    const { workshop, status, activeStep } = this.state;
    if (isEmpty(workshop)) return <div></div>;
    
    return (
    <div className="presentation">
      <div className="presentation-header">{workshop.title}</div>
      <div className="presentation-toolbar">
        <div className="back" onClick={this.goBack}>
          <Icon size={18} icon={ic_keyboard_arrow_left} />
        </div>
        <div className="current-step">{ activeStep + 1 } of { workshop.steps.length }</div>
        <div className="back" onClick={this.goFoward}>
          <Icon size={18} icon={ic_keyboard_arrow_right} />
        </div>
        <div className={`action-attendee ${status.toLowerCase()}`} onClick={this.onClick}>{status === 'WORKING' ? 'Complete' : 'Next Step'}</div>
      </div>
      <Step step={workshop.steps[activeStep]} />
    </div>
  );

  }
}

const wrapped = firebaseConnect(({ match: { params }}) => ([
  `/organizers/${params.organizerId}/workshops/${params.workshopId}`
]))(AttendeeView);

export default connect(
  ({ firebase: { data }}) => ({ workshop: !isEmpty(data) && data })
)(wrapped);