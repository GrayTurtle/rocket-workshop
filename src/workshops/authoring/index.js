import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import uid from 'uid';
import { convertToRaw, EditorState, convertFromRaw  } from 'draft-js';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import './assets/css/index.css';
import Content from './tabs/content';
import Details from './tabs/details';

const getActive = (active, steps) => {
  if (steps.length === 2) {
    return 0;
  } else {
    return active - 1
  }
};

class Authoring extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      steps: [{ editorState: EditorState.createEmpty() }],
      active: 0,
      tab: 'CONTENT'
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.workshop)) {
      const { match: { params: { organizerId, workshopId } } } = nextProps; 
      const workshop = nextProps.workshop.organizers[organizerId].workshops[workshopId];
      
      if (workshop && workshop.steps && workshop.steps.length > 0 && workshop.steps[0]) {
        workshop.steps = workshop.steps.map(step => {
          if(typeof step.contentState === 'string') {
            const contentState = convertFromRaw(JSON.parse(step.contentState));
            const editorState = EditorState.createWithContent(contentState);
            return { ...step, editorState}
          }
       });
      }

      this.setState({
        ...workshop
      });
    }
  }
  
  onEditorChange = (editorState) => {
    const { active, steps } = this.state;
    const step = steps[active];
    this.setState({
      steps: update(steps, {[active]: {$set: {...step, editorState}}})
    });
  }
  
  onStepChange = (active) => {
    this.setState({
      active
    })
  }
  
  onStepDelete = (index) => {
    const { steps, active } = this.state;
    if (steps.length === 1) return;
    
    this.setState({
      steps: update(steps, {$splice: [[index, 1]]}),
      active: active !== index ? active : getActive(active, steps)
    });
  }
  
  onStepNameChange = (name, index) => {
    const { steps } = this.state;
    const step = steps[index];
    this.setState({
      steps: update(steps, {[index]: {$set: {...step, name}}})
    });
  }

  addStep = () => {
    const { steps } = this.state;
    const step = { name: `Step ${steps.length + 1}`, editorState: null, id: uid() };
    this.setState({
      steps: update(steps, {$push: [step]}),
    });
  }
  
  onEditorSave = () => {
    const { steps } = this.state;
    const { match: { url }, firebase } = this.props;
    const parts = url.split('/');
    steps.forEach(step => { 
      step.contentState = JSON.stringify(convertToRaw(step.editorState.getCurrentContent()));
      delete step.editorState;
    });
    firebase.set(`/organizers/${parts[2]}/workshops/${parts[4]}/steps`, steps);
  }
  
  changeTab = ({ target }) => {
    this.setState({
      tab: target.getAttribute('name')
    });
  }

  render() {
    const { steps, active, tab, title, presenter, mentors, date } = this.state;
    const { match: { params: { organizerId, workshopId }}} = this.props;
    
    if (steps.length === 0) return <div></div>;
    
    return (
      <div className="authoring">
        <div className="authoring-title">{title}</div>
        <div className="tab-bar">
          <div className={`tab ${tab === 'DETAILS' && 'active'}`} onClick={this.changeTab} name="DETAILS">Details</div>
          <div className={`tab ${tab === 'CONTENT' && 'active'}`} onClick={this.changeTab} name="CONTENT">Content</div>
          <Link className="tab" to={`/organizer/${organizerId}/workshops/${workshopId}/present/view`}>Present</Link>
        </div>
        {tab === 'CONTENT' && (
          <Content 
            onEditorSave={this.onEditorSave}
            onEditorChange={this.onEditorChange}
            active={active}
            steps={steps}
            addStep={this.addStep}
            onStepChange={this.onStepChange}
            onStepDelete={this.onStepDelete}
            onStepNameChange={this.onStepNameChange}
          />
        )}
        {tab === 'DETAILS' && ( 
          <Details title={title} mentors={mentors} presenter={presenter} date={date} />
        )}
      </div>
    );
  }

}

const wrapped = firebaseConnect(({ match: { params }}) => ([
  `/organizers/${params.organizerId}/workshops/${params.workshopId}`
]))(Authoring);

export default connect(
  ({ firebase: { data }}) => ({ workshop: !isEmpty(data) && data })
)(wrapped);