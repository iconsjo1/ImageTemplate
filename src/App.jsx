import React from "react";
import ZoomableDraggableImage from "./ZoomableDraggableImage";
import "./App.css";
import backgroundUrl from './assets/face.jpg'; // Import the background image from the assets folder
import overlayUrl from './assets/output-onlinepngtools.png'; // Import the overlay image from the assets folder

const App = () => {
  return (
    <div className="App">
      <ZoomableDraggableImage backgroundUrl={backgroundUrl} overlayUrl={overlayUrl} />
    </div>
  );
};

export default App;
