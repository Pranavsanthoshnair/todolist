import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

const TodoContainer = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #764ba2;
  }
`;

const TodoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  gap: 1rem;
`;

const TodoText = styled.span`
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#888' : '#333'};
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.delete ? '#ff6b6b' : '#51cf66'};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.delete ? '#ff5252' : '#40c057'};
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: #888;
  margin-top: 2rem;
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <TodoContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <Button
          whileTap={{ scale: 0.95 }}
          onClick={addTodo}
        >
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
      </InputContainer>

      <AnimatePresence>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <TodoText completed={todo.completed}>{todo.text}</TodoText>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTodo(todo.id)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </IconButton>
            <IconButton
              delete
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteTodo(todo.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </TodoItem>
        ))}
      </AnimatePresence>

      {todos.length === 0 && (
        <EmptyState>No todos yet. Add some tasks to get started!</EmptyState>
      )}
    </TodoContainer>
  );
}

export default TodoList; 