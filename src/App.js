import React, { useEffect, useState } from 'react';
import './App.scss';
import Form from './components/form';
import Tasks from './components/tasks';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    getStorageItems();
  }, [])

  useEffect(() => {
    handleFilterClick();
    saveStorageItems();
  }, [tasks, status])

  const handleFilterClick = () => {
    switch (status) {
      case true:
        setFilteredTasks(tasks.filter(el => el.done === false));
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  const saveStorageItems = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const getStorageItems = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }else {
      let localItems = JSON.parse(localStorage.getItem("tasks"));
      if (localItems.length > 0) {
        setTasks(localItems)
      }
    }
  }



  return (
    <div className="App">
      <Form 
        tasks={tasks} 
        setTasks={setTasks} 
        setInputValue={setInputValue} 
        inputValue={inputValue}
      />
      <Tasks 
        setTasks={setTasks} 
        tasks={tasks}
        setStatus={setStatus}
        status={status}
        filteredTasks={filteredTasks}
      />
    </div>
  );
}

export default App;