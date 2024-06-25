import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomableDraggableImage = ({ backgroundUrl, overlayUrl }) => {
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });

  const handleOverlayDrag = (e, data) => {
    setOverlayPosition({ x: data.x, y: data.y });
  };

  const handleOverlayResize = (e, data) => {
    setOverlaySize({ width: data.node.clientWidth, height: data.node.clientHeight });
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = overlaySize.width;
    canvas.height = overlaySize.height;
    const ctx = canvas.getContext("2d");

    // Draw the background image to the canvas
    const background = new Image();
    background.onload = () => {
      ctx.drawImage(background, -overlayPosition.x, -overlayPosition.y);
      // Draw the overlay image to the canvas
      const overlay = new Image();
      overlay.onload = () => {
        ctx.drawImage(overlay, 0, 0);
        // Convert canvas to data URL and initiate download
        const dataUrl = canvas.toDataURL("image/jpeg");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "cropped_image.jpg";
        a.click();
      };
      overlay.src = overlayUrl;
    };
    background.src = backgroundUrl;
  };

  return (
    <div className="zoom-container">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={0}
        defaultPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => {
                resetTransform();
                setOverlayPosition({ x: 0, y: 0 });
                setOverlaySize({ width: 0, height: 0 });
              }}>Reset</button>
              <button onClick={handleDownload}>Download Cropped Image</button>
            </div>
            <Draggable
              position={overlayPosition}
              onDrag={handleOverlayDrag}
              onStop={handleOverlayResize}
              bounds="parent"
            >
              <div className="overlay">
                <TransformComponent>
                  <img
                    src={overlayUrl}
                    alt="Overlay"
                    className="overlay-image"
                  />
                </TransformComponent>
              </div>
            </Draggable>
            <TransformComponent>
              <img
                src={backgroundUrl}
                alt="Background"
                className="background-image"
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ZoomableDraggableImage;
