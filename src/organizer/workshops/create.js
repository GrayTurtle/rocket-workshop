import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Create extends Component {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }
  
  onChange = ({ target: value }) => {
    this.setState({
      name: value
    });
  }

  render() {
    const { name } = this.state; 
    return (
      <div className="create-orgnization">
        <input type="text" name="name" value={name} />
      </div>
    );
  }

}

export default Create;