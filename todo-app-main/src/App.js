import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/Header';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority = 'medium') => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        priority
      };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const editTodo = (id, newText, priority) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, text: newText, priority } : todo
      )
    );
  };
  
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header />
        <div className="app-content">
          <TodoForm addTodo={addTodo} />
          <TodoList 
            todos={todos} 
            deleteTodo={deleteTodo} 
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
          {todos.some(todo => todo.completed) && (
            <button className="clear-completed" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;