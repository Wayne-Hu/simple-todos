import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Tasks, setChecked, insertTask } from "../api/task";
import { withTracker } from "meteor/react-meteor-data";
import Login from "./Login";
import Register from "./Register";
import TaskList from "./TaskList";

// App component - represents the whole app
export class App extends Component {
  addNewTask(e) {
    e.preventDefault();

    insertTask.call({ text: this.textInput.value.trim() });

    this.textInput.value = null;
  }

  toggleCheck(task) {
    setChecked.call({ taskId: task._id, checked: !task.checked });
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

        <ul>
          <li>
            <Link to="/">Root</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" render={() => <div>Root path</div>} />
          <Route path="/about" render={() => <div>About page</div>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  withTracker(() => {
    Meteor.subscribe("tasks");

    return {
      tasks: Tasks.find({}).fetch()
    };
  })(App)
);
