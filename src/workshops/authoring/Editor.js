import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { Editor as Draft } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './assets/css/Editor.css';

class Editor extends Component {

  static propTypes = {
    
  };
  
  static defaultProps = {
    editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
    const { onChange } = this.props;
    onChange(editorState);
  };

  render() {
    const { editorState } = this.props;
    return (
      <Draft
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }

}

export default Editor;