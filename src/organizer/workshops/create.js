import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import './create.css';
import 'react-datepicker/dist/react-datepicker.css';

import uid from 'uid';

class Create extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date: moment(),
      id: uid()
    };
  }
  
  onChange = ({ target: { value }}) => {
    this.setState({
      name: value
    });
  }
  
  handleChange = (date) => {
    this.setState({
      date
    });
  }
  
  handleCreate = () => {
    const { firebase, match: { params: { organizerId } }, history } = this.props;
    const { name, date, id } = this.state;
    firebase.set(`/organizers/${organizerId}/workshops/${id}`, { 
      title: name, 
      date: date.toString(), 
      id, 
      attendee: [], 
      step: 0, 
      status: 'WORKING', 
      mentors: [], 
      presenter: '', 
      steps: []
    })
    .then(() => {
      history.push(`/organizer/${organizerId}/workshops/${id}/edit`);
    })
  }

  render() {
    const { name, date } = this.state; 
    return (
      <div className="create-orgnization">
        <input className="title" type="text" name="name" value={name} onChange={this.onChange} placeholder="Workshop Title" />
        <DatePicker
            className="workshop-date"
            selected={date}
            onChange={this.handleChange}
            placeholderText="Date of Workshop"
            showTimeSelect
            timeIntervals={15}
            dateFormat="LLL"
        />
        <button className="create-workshop" name="create" onClick={this.handleCreate}>Create</button>
      </div>
    );
  }

}

export default firebaseConnect()(Create);