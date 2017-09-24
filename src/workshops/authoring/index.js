import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import uid from 'uid';
import { convertToRaw } from 'draft-js';
import { firebaseConnect } from 'react-redux-firebase';

import './index.css';
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
      steps: [
        { name: 'Step 1', editorState: null, id: uid() },
      ],
      active: 0
    };
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

  render() {
    const { steps, active } = this.state;
    return (
      <div className="authoring">
        <div className="side-panel">
          {steps.map((step, i) => (
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

export default firebaseConnect()(Authoring);