import React, { Component } from 'react';

class JoiningForm extends Component {
  register(e){
    e.preventDefault();
    var firstName = this.refs.firstName.value.trim();
    var lastName = this.refs.lastName.value.trim();
    var email = this.refs.email.value.trim();

    alert("Thank YOU" + firstName + " " + lastName);

    this.refs.firstName.value = '';
    this.refs.lastName.value = '';
    this.refs.email.value = '';

  }

  render() {
    return(
      <div>
        <form onSubmit={this.register}>
          <div className="form-group">
            <label htmlFor="firstName">First Name: </label>
            <input type="text" className="form-control" placeholder="First Name" ref="firstName" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" className="form-control" placeholder="Last Name" ref="lastName" />
          </div>
          <div className="form-group">
          <label htmlFor="SoonerID">SoonerID: </label>
          <input type="text" className="form-control" placeholder="SoonerID" ref="SoonerID" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" className="form-control" placeholder="Email" ref="email" />
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default JoiningForm;

// <div className="Attendee">
//     {attendees.map(attendee =>
//         <Attendee status={attendee.status} step={attendee.step}
//     username={attendee.username} num={attendee.num}/>)}
// </div>
