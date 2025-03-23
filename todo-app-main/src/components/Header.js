import React from 'react';

function Header() {
  return (
    <header className="app-header" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--header-text)' }}>
      <h1>Joe's To-Do App</h1>
    </header>
  );
}

export default Header;