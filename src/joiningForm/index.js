import React, { Component } from 'react';

class JoiningForm extends Component {
  register(e){
    e.preventDefault();
    var firstName = this.firstName.value.trim();
    var lastName = this.lastName.value.trim();
    var email = this.email.value.trim();

    alert("Thank YOU" + firstName + " " + lastName);

  }

  render() {
    return(
      <div>
        <form onSubmit={this.register}>
          <div className="form-group">
            <label htmlFor="firstName">First Name: </label>
            <input type="text" className="form-control" placeholder="First Name" ref={input => this.firstName = input} />
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default JoiningForm;
