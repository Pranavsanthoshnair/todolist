import React, { useState } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

function TodoForm({ addTodo, todo, editTodo, setEditing }) {
  const [value, setValue] = useState(todo ? todo.text : '');
  const [priority, setPriority] = useState(todo ? todo.priority : 'medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (todo) {
      editTodo(todo.id, value, priority);
      setEditing(false);
    } else {
      addTodo(value, priority);
      setValue('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          className="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="todo-button">
          {todo ? <FaSave /> : <FaPlus />}
        </button>
        {todo && (
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => setEditing(false)}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;
