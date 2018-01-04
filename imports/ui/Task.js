import React, { Component } from "react";
import styled from "styled-components";

const Li = styled.li`
  background-color: ${props => (props.checked ? "grey" : "green")};
  margin: 2px;
  width: 200px;
  :hover {
    background-color: lightgreen;
  }
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
    </Li>
  );
}

export default Task;
