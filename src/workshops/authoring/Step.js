import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever';       
import { DragSource } from 'react-dnd';

import './assets/css/Step.css';

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
    const { name, active, index, onDelete, onNameChange } = this.props;
    
    return (
      <div className={`step ${active && 'active'}`} onClick={this.onHandlerClick}>
        <input value={name} onChange={({ target: { value }}) => onNameChange(value, index)} />
        <div className="delete" onClick={() => onDelete(index)}>
          <Icon icon={ic_delete_forever} size={20} />
        </div>
      </div>
    )
  }

}

Step.propTypes = {
  
};

export default Step;
