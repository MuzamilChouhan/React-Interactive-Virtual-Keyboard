import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';

function App() {
  const [typedText, setTypedText] = useState('');

  // Handles key presses from both physical and on-screen events
  const handleKeyPress = (key) => {
    if (key === 'Backspace') {
      setTypedText(prev => prev.slice(0, -1));
    } else if (key === 'Enter') {
      setTypedText(prev => prev + '\n');
    } else if (key === 'Tab') {
      setTypedText(prev => prev + '    ');
    } else if (key === 'Escape') {
      // You can customize Escape to clear text or do nothing
    } else if (key.length === 1 || key === 'Space') {
      // For the Space key, we want to add an actual space
      setTypedText(prev => prev + (key === 'Space' ? ' ' : key));
    }
  };

  return (
    <div className="app-container">
      <h1>Interactive Cyber Keyboard</h1>
      <textarea 
        className="text-display" 
        value={typedText} 
        readOnly 
        placeholder="Start typing..."
      />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
