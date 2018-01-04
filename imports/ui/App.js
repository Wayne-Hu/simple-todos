import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/task.js";
import TaskList from "./TaskList.js";

// App component - represents the whole app
export class App extends Component {
  addNewTask(e) {
    e.preventDefault();
    console.log(this.textInput.value);

    Tasks.insert({
      text: this.textInput.value.trim(),
      createdAt: new Date()
    });

    this.textInput.value = null;
  }

  toggleCheck(task) {
    Tasks.update(
      { _id: task._id },
      { $set: { checked: task.checked ? !task.checked : true } }
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

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
  return {
    tasks: Tasks.find({}).fetch()
  };
})(App);
