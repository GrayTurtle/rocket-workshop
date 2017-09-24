import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
  handleChange = (e) => {
	  /*
	  	Calling God Mode's onFilterChange()
	  */
	  this.props.onFilterChange(e.target.value);
  }

  render() {
	return (
	  <div className="Filter-Wrap">
		  <select id = "dropdown" onChange={this.handleChange}>
			  <option value="">ALL</option>
			  <option value="HELP">HELP</option>
			  <option value="WORKING">WORKING</option>
			  <option value="ROCKET">ROCKET</option>
			  <option value="GOOD">GOOD</option>
		  </select>
	  </div>
	);
  }
}

export default Filter;
