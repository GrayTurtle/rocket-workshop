import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import uid from 'uid';
import { convertToRaw, EditorState, ContentState, convertFromRaw  } from 'draft-js';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import './assets/css/index.css';
import Editor from './Editor';
import Step from './Step';

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
      steps: [],
      active: 0
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.workshop)) {
      const { match: { params: { organizerId, workshopId } } } = nextProps; 
      const workshop = nextProps.workshop.organizers[organizerId].workshops[workshopId];
      
      if (workshop && workshop.steps && workshop.steps.length > 0 && workshop.steps[0]) {
        debugger;
        workshop.steps = workshop.steps.map(step => {
         const contentState = convertFromRaw(JSON.parse(step.contentState));
         const editorState = EditorState.createWithContent(contentState);
         return { ...step, editorState}
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
    
    const { match: { url }, firebase } = this.props;
    const parts = url.split('/');
    
    steps.forEach(step => { 
      step.contentState = JSON.stringify(convertToRaw(step.editorState.getCurrentContent()));
    });
    firebase.set(`/organizers/${parts[2]}/workshops/${parts[4]}/steps`, steps);
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

  render() {
    const { steps, active } = this.state;
    
    if (steps.length === 0) return <div></div>;
    
    return (
      <div className="authoring">
        <div className="side-panel">
          {steps && steps.map((step, i) => (
            <Step 
              active={i === active} 
              name={step.name} 
              key={step.id} 
              onClick={this.onStepChange} 
              onDelete={this.onStepDelete}
              onNameChange={this.onStepNameChange}
              index={i}
            />
          ))}
          <div className="add-step" onClick={this.addStep}>+</div>
        </div>
        <div className="editor-container">
          <Editor onChange={this.onEditorChange} editorState={steps[active].editorState} />
          <div className="editor-save" onClick={this.onEditorSave}>Save</div>
        </div>
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