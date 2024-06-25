import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ZoomableDraggableImage = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={0}
      defaultPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="zoom-container">
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button
              onClick={() => {
                resetTransform();
                setPosition({ x: 0, y: 0 });
              }}
            >
              x
            </button>
          </div>
          <Draggable position={position} onDrag={handleDrag}>
            <div>
              <TransformComponent>
                <img
                  src={imageUrl}
                  alt="Background"
                  className="draggable-image"
                />
              </TransformComponent>
            </div>
          </Draggable>
        </div>
      )}
    </TransformWrapper>
  );
};

export default ZoomableDraggableImage;
