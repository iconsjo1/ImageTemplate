import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomableDraggableImage = ({ backgroundUrl, overlayUrl }) => {
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });
  const backgroundRef = useRef(null); // Reference to background image for dimensions
  const [zoomScale, setZoomScale] = useState(1); // State to track zoom scale

  const handleZoomChange = (newScale) => {
    setZoomScale(newScale);
  };

  const handleOverlayDrag = (e, data) => {
    setOverlayPosition({ x: data.x, y: data.y });
  };

  const handleOverlayResize = (e, data) => {
    setOverlaySize({ width: data.node.clientWidth, height: data.node.clientHeight });
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const backgroundImg = backgroundRef.current;

    // Ensure background image is loaded before proceeding
    if (!backgroundImg.complete) {
      alert("Background image is not fully loaded. Please wait and try again.");
      return;
    }

    // Calculate canvas dimensions considering zoom scale
    const canvasWidth = overlaySize.width * zoomScale;
    const canvasHeight = overlaySize.height * zoomScale;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // Calculate position adjustments based on overlay's position relative to background
    const overlayBounds = backgroundImg.getBoundingClientRect();
    const posX = (overlayPosition.x - overlayBounds.left) * zoomScale;
    const posY = (overlayPosition.y - overlayBounds.top) * zoomScale;

    // Draw background image to canvas adjusted by overlay's position and zoom
    ctx.drawImage(backgroundImg, -posX, -posY, backgroundImg.width * zoomScale, backgroundImg.height * zoomScale);

    // Draw overlay image to canvas
    const overlay = new Image();
    overlay.onload = () => {
      ctx.drawImage(overlay, 0, 0, overlaySize.width * zoomScale, overlaySize.height * zoomScale);
      // Convert canvas to data URL and initiate download
      const dataUrl = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "cropped_image.jpg";
      a.click();
    };
    overlay.src = overlayUrl;
  };

  return (
    <div className="zoom-container">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={0}
        defaultPositionY={0}
        onZoomChange={handleZoomChange}
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
                ref={backgroundRef}
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
