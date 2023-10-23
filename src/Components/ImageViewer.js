import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';

export default function ImageViewer(props) {
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState(null);
  const [maxZoom, setMaxZoom] = useState(2); // Set an appropriate maximum zoom level
  

  const handleMouseOver = () => {
    setZoom(1.7);
    setIsZoomed(true);
  };

  const handleMouseOut = () => {
    setZoom(1);
    setIsZoomed(false);
    setImagePosition({ x: 0, y: 0 }); // Reset image position when zooming out
  };

  const handleMouseMove = (e) => {
    // Update the image position based on the mouse position
    const image = e.target;
    const imageRect = image.getBoundingClientRect();
    const x = ((e.clientX - imageRect.left) / imageRect.width) * 100;
    const y = ((e.clientY - imageRect.top) / imageRect.height) * 100;
    setImagePosition({ x, y });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Calculate the initial distance between two fingers
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const initialDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setInitialPinchDistance(initialDistance);
    }
  };
  
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      e.preventDefault();
      // Calculate the current distance between two fingers
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  
      // Calculate the zoom factor
      const newZoom = Math.min(Math.max(1, zoom * (currentDistance / initialPinchDistance)), maxZoom);
  
      // Set the new zoom level
      setZoom(newZoom);
    }
  };
  
  const handleTouchEnd = () => {
    setInitialPinchDistance(null);
  };
  

  const imageStyle = {
    transform: `scale(${zoom})`,
    transition: isZoomed ? 'transform 0.5s' : 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`, // Set the zoom origin based on mouse position
  };

  useEffect(() => {
    if (!isZoomed) {
      setImagePosition({ x: 0, y: 0 }); // Reset image position when zooming out
    }
  }, [isZoomed]);

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Button
        variant="secondary"
        onClick={props.handleClose}
        className="position-absolute top-0 start-100 translate-middle"
        style={{ zIndex: '1', padding: '6px', borderRadius: '50%' }}
      >
         &#10006;
      </Button>
      <Modal.Body onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onMouseMove={handleMouseMove} style={{ overflow: 'hidden', textAlign: 'center' }}>
        <Carousel
          fade
          activeIndex={props.activeIndex}
          onSelect={(selectedIndex, e) => {
            props.handleSelect(selectedIndex);
          }}
          interval={null}
        >
          {props.images.map((image, index) => (
            <Carousel.Item key={index}>
              {/* <Image src={image} rounded className="img-fluid" style={imageStyle} /> */}

              <Image
                  src={image}
                  rounded
                  className="img-fluid"
                  style={imageStyle}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />

            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}
