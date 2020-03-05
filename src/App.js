import { v4 as uuidv4 } from 'uuid';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }
function handleClearTodo(){
  const newTodos = todos.filter(todo => !todo.complete);
  setTodos(newTodos);
}

  function handleAddToDo(e) {
    const name = todoNameRef.current.value;
    if(name === '')  return;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false }]
    });
    todoNameRef.current.value = '';
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo = {toggleTodo} />
      <input ref={todoNameRef} type="text"/>
      <button onClick = {handleAddToDo}>Add Todo</button>
      <button onClick = {handleClearTodo}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
    </>
  );
}

export default App;
