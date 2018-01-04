import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";

class Register extends Component {
  doRegister(e) {
    e.preventDefault();
    Accounts.createUser({
      username: this.userInput.value.trim(),
      email: this.emailInput.value.trim(),
      password: this.passwordInput.value.trim()
    });
  }

  render() {
    return (
      <form>
        <input type="username" ref={input => (this.userInput = input)} />
        <input type="email" ref={input => (this.emailInput = input)} />
        <input type="password" ref={input => (this.passwordInput = input)} />
        <button onClick={this.doRegister.bind(this)}>Register</button>
      </form>
    );
  }
}

export default Register;
