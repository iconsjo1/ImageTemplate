import React from 'react';
import ZoomableDraggableImage from './ZoomableDraggableImage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <ZoomableDraggableImage imageUrl="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ1MTl8MHwxfGFsbHwxfHx8fHx8fHwxNjU2Nzg0MjI5&ixlib=rb-1.2.1&q=80&w=1080" />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
        alt="Overlay"
        className="overlay-image"
      />
    </div>
  );
};

export default App;
