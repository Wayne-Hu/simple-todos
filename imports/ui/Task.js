import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import { start } from "repl";

const Li = styled.li`
  background-color: ${props => (props.checked ? "grey" : "green")};
  margin: 2px;
  width: 200px;
  :hover {
    background-color: lightgreen;
  }
  :after {
    clear: both;
  }
`;

const Button = styled.button`
  float: right;
  width: 100px;
`;

function Task({ task, onCheck }) {
  return (
    <Li checked={task.checked}>
      <input
        type="checkbox"
        onChange={() => {
          onCheck(task);
        }}
        defaultChecked={task.checked}
      />
      {task.text}
      <Button
        onClick={e => {
          e.preventDefault();
          Meteor.call("tasks.remove", task._id);
        }}
      >
        Delete
      </Button>
    </Li>
  );
}

export default Task;
