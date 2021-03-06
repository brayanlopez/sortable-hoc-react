import React, { useState, useEffect } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './style.css';

const uri = "http://localhost:4000/tasks";

const SortableItem = SortableElement(({ value }) => {
  return (
    <li className="list-group-item">
      <h1>{value.title}</h1>
      <p>{value.description}</p>
    </li>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((task, i) => (
        <SortableItem value={task} key={i} index={i} />
      ))}
    </ul>
  );
});

function SortableComponent() {
  const [tasks, setTasks] = useState([
    // { title: 'task 1', description: 'this is a task' },
    // { title: 'task 2', description: 'this is a task' },
    // { title: 'task 3', description: 'this is a task' },
    // { title: 'task 4', description: 'this is a task' },
    // { title: 'task 5', description: 'this is a task' }
  ]);
  const getData = async () => {
    const res = await fetch(uri);
    const tasks = await res.json();
    tasks.sort((a, b) => (a.sorting > b.sorting) ? 1 : ((b.sorting > a.sorting) ? -1 : 0));
    setTasks(tasks);
  }
  useEffect(() => { getData() }, []);

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    let taskCopy = [...tasks];
    taskCopy = arrayMove(taskCopy, oldIndex, newIndex);
    setTasks(taskCopy);
    const tasksIds = taskCopy.map(t => t._id);
    const res = await fetch(uri, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(tasksIds)
    });
    const data = await res.json();
  };
  return <SortableList items={tasks} onSortEnd={onSortEnd} />;
}

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <SortableComponent />
        </div>
      </div>
    </div>
  );
}
