import React, { useEffect, useState } from 'react';

// Normalize key values for matching our on-screen labels
function normalizeKey(key) {
  if (key === ' ') return 'Space';
  if (key.length === 1) return key.toUpperCase();
  return key;
}

// Define the keyboard layout rows
const keys = [
  ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Control', 'Alt', 'Space', 'Alt', 'Control']
];

function Keyboard({ onKeyPress }) {
  const [pressedKey, setPressedKey] = useState(null);

  // Physical keyboard handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = normalizeKey(event.key);
      setPressedKey(key);
      onKeyPress(key);
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyPress]);

  // On-screen key click handler
  const handleClick = (key) => {
    setPressedKey(key);
    onKeyPress(key);
    setTimeout(() => {
      setPressedKey(null);
    }, 150);
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((key) => (
            <div
              key={key + rowIndex} // ensures a unique key for each element
              className={`key ${pressedKey === key ? 'active' : ''}`}
              onClick={() => handleClick(key)}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
