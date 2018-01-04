import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

class Login extends Component {
  doLogin(e) {
    e.preventDefault();
    Meteor.loginWithPassword(
      this.emailInput.value.trim(),
      this.passwordInput.value.trim(),
      err => {
        if (!err) {
          console.log("Logged in successfully");
        }
      }
    );
  }

  render() {
    return (
      <form>
        <input type="email" ref={input => (this.emailInput = input)} />
        <input type="password" ref={input => (this.passwordInput = input)} />
        <button onClick={this.doLogin.bind(this)}>Login</button>
      </form>
    );
  }
}

export default Login;
