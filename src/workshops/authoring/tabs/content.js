import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../Editor';
import Step from '../Step';
import './content.css';

const Content = ({ steps, active, addStep, onEditorChange, onEditorSave, onStepChange, onStepDelete, onStepNameChange }) => (
  <div className="content">
    <div className="side-panel">
      {steps && steps.map((step, i) => (
        <Step 
          active={i === active} 
          name={step.name} 
          key={step.id} 
          onClick={onStepChange} 
          onDelete={onStepDelete}
          onNameChange={onStepNameChange}
          index={i}
        />
      ))}
      <div className="add-step" onClick={addStep}>+</div>
    </div>
    <div className="editor-container">
      <Editor onChange={onEditorChange} editorState={steps[active].editorState} />
      <div className="editor-save" onClick={onEditorSave}>Save</div>
    </div>
  </div>
);

Content.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  active: PropTypes.number.isRequired,
  addStep: PropTypes.func.isRequired
};

export default Content;