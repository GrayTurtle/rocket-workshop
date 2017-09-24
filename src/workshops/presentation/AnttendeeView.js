import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left'; 
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';   
import Step from './step';
import './present.css';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

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
      debugger;
      this.setState({
        workshop,
        attendee,
        activeStep: attendee.step,
        status: attendee.status
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
        <div className={`action ${status.toLowerCase()}`} onClick={this.onClick}>{status === 'WORKING' ? 'Complete' : 'Next Step'}</div>
      </div>
      <Step step={workshop.steps[activeStep]} />
    </div>
  );

  }
}

const wrapped = firebaseConnect((props) => {
  const { match: { params }} = props;
  return  ([
    `/organizers/${params.organizerId}/workshops/${params.workshopId}`
  ])
})(AttendeeView)

export default connect(
  (props) => {
    const { firebase: {data} } = props;
    return { attendee: !isEmpty(data) && data };
  }
)(wrapped)