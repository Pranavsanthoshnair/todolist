import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

function TodoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <TodoForm 
          todo={todo} 
          editTodo={editTodo} 
          setEditing={setIsEditing} 
        />
      </div>
    );
  }

  return (
    <div className={`todo-item priority-${todo.priority}`}>
      <div className="todo-checkbox" onClick={() => toggleComplete(todo.id)}>
        <div className={`checkbox ${todo.completed ? 'checked' : ''}`}>
          {todo.completed && <FaCheck className="check-icon" />}
        </div>
      </div>
      <div 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
      >
        {todo.text}
        <span className="priority-badge">
          {todo.priority}
        </span>
      </div>
      <div className="todo-actions">
        <button 
          className="edit-button"
          onClick={() => setIsEditing(true)}
          disabled={todo.completed}
          title="Edit task"
        >
          <FaEdit />
        </button>
        <button 
          className="delete-button"
          onClick={() => deleteTodo(todo.id)}
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
