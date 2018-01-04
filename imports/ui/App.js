import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Tasks } from "../api/task";
import { withTracker } from "meteor/react-meteor-data";
import Login from "./Login";
import Register from "./Register";
import TaskList from "./TaskList";

// App component - represents the whole app
export class App extends Component {
  addNewTask(e) {
    e.preventDefault();

    Meteor.call("tasks.insert", this.textInput.value.trim());

    this.textInput.value = null;
  }

  toggleCheck(task) {
    Meteor.call("tasks.setChecked", task._id, !task.checked);
  }

  render() {
    const user = Meteor.user();
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        {!user ? (
          [<Login key="login" />, <Register key="register" />]
        ) : (
          <div>{user.username}</div>
        )}

        <TaskList
          tasks={this.props.tasks}
          onCheck={this.toggleCheck.bind(this)}
        />

        <form>
          <input type="text" ref={input => (this.textInput = input)} />
          <button onClick={this.addNewTask.bind(this)}>submit</button>
        </form>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("tasks");

  return {
    tasks: Tasks.find({}).fetch()
  };
})(App);
