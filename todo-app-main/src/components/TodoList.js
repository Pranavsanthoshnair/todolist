import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleComplete, editTodo }) {
  const [sortBy, setSortBy] = useState('default');
  
  const getSortedTodos = () => {
    switch(sortBy) {
      case 'priority':
        return [...todos].sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      case 'completed':
        return [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
      case 'alphabetical':
        return [...todos].sort((a, b) => a.text.localeCompare(b.text));
      default:
        return todos;
    }
  };
  
  const sortedTodos = getSortedTodos();

  return (
    <div className="todo-list">
      {todos.length > 0 && (
        <div className="todo-list-header">
          <span>{todos.length} {todos.length === 1 ? 'task' : 'tasks'}</span>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priority">Priority</option>
            <option value="completed">Completion</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      )}
      
      {todos.length === 0 ? (
        <div className="empty-state">
          <p className="empty-message">Your task list is empty</p>
          <p className="empty-submessage">Add a new task above to get started</p>
        </div>
      ) : (
        <div className="todo-items-container">
          {sortedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              editTodo={editTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
