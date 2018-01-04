import React from "react";
import styled from "styled-components";
import Task from "./Task";

const Ul = styled.ul`
  list-style: none;
`;

function TaskList({ tasks, onCheck }) {
  return (
    <Ul>
      {tasks.map(task => <Task key={task._id} onCheck={onCheck} task={task} />)}
    </Ul>
  );
}

export default TaskList;
