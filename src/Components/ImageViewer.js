import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import cross from "../Images/cross.svg";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ImageViewer(props) {
  const location = useLocation();
  const useParams = new URLSearchParams(location.search);
  const type = useParams.get("product");

  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState(null);
  const [maxZoom, setMaxZoom] = useState(2); // Set an appropriate maximum zoom level

  const handleMouseOver = () => {
    setZoom(4);
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

  const handleTouchStart = () => {
    setZoom(2.5);
    setIsZoomed(true);
  };

  const handleTouchOut = (e) => {
    // Prevent the default behavior of the touch event
    e.preventDefault();
  
    setZoom(1);
    setIsZoomed(false);
    setImagePosition({ x: 0, y: 0 });
  };
  

  const handleTouchMove = (e) => {
    // Stop the touch event propagation to prevent changing the active image
    e.stopPropagation();
  
    // Update the image position based on the touch position
    const image = e.target;
    const imageRect = image.getBoundingClientRect();
    const x = ((e.touches[0].clientX - imageRect.left) / imageRect.width) * 100;
    const y = ((e.touches[0].clientY - imageRect.top) / imageRect.height) * 100;
    setImagePosition({ x, y });
  };

  const imageStyle = {
    transform: `scale(${zoom})`,
    transition: isZoomed ? "transform 0.5s" : "none",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`, // Set the zoom origin based on mouse position
  };

  useEffect(() => {
    if (!isZoomed) {
      setImagePosition({ x: 0, y: 0 }); // Reset image position when zooming out
    }
  }, [isZoomed]);


  return (
    <Modal show={props.show} onHide={props.handleClose} centered className="imageViewer">
      <Button
        variant="secondary"
        onClick={props.handleClose}
        className="position-absolute top-0 start-100 translate-middle"
        style={{ zIndex: "3", padding: "3px", paddingTop: "0px" }}
      >
        <img src={cross} style={{ width: "20px" }} />
      </Button>
      <Modal.Body style={{ overflow: "hidden", textAlign: "center" }}>
        <Carousel
          fade
          activeIndex={props.activeIndex}
          onSelect={(selectedIndex, e) => {
            props.handleSelect(selectedIndex);
          }}
          interval={null}
          >
          {props.images.map((image, index) => (
            <Carousel.Item
              key={index}
              onMouseOver={type === "models" ? null : handleMouseOver}
              onMouseOut={type === "models" ? null : handleMouseOut}
              onMouseMove={type === "models" ? null : handleMouseMove}
              onClick={type === "models" ? null :handleTouchStart}
              onTouchMove={type === "models" ? null :handleTouchMove}
              onDoubleClick={type === "models" ? null :handleTouchOut}
            >
              <Image
                src={image}
                //rounded
                width="auto"
                height="635px"
                style={imageStyle}
                className="mobileImage"
              />
              
            </Carousel.Item>
          ))}

        </Carousel>
      </Modal.Body>
    </Modal>
  );
}
