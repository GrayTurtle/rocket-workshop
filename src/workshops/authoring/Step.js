import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever';       
import { DragSource } from 'react-dnd';

import './assets/css/Step.css';

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag({ name, active, index}) {
    return {
      name, 
      active, 
      index
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  text: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};


class Step extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }
  
  onHandlerClick = ({ target }) => { 
    const { onClick, index } = this.props;
    if (target.tagName === 'path' || target.tagName === 'svg') return;
    onClick(index);
  }

  render() {
    const { name, active, index, onDelete, onNameChange, connectDragSource } = this.props;
    
    return connectDragSource(
      <div className={`step ${active && 'active'}`} onClick={this.onHandlerClick}>
        <input value={name} onChange={({ target: { value }}) => onNameChange(value, index)} />
        <div className="delete" onClick={() => onDelete(index)}>
          <Icon icon={ic_delete_forever} size={20} />
        </div>
      </div>
    );
  }

}

Step.propTypes = {
  
};

export default DragSource('Step', cardSource, collect)(Step);
