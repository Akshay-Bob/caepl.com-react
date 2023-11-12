import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Modal, Button } from "react-bootstrap";
import cross from "../../Images/cross.svg";
import RightVerticalSlider from "../RightVerticalSlider";
import MobileImageCarousal from "../MobileImageCarousal";
// import MobileViewProductSlider from "./MobileViewProductSlider";

export default function ProductImageSlider(props) {
  const sliderImagesData = props.images
    ? props.images.map((item) => item.proImg)
    : [];

    const slideOption = props.images ? props.images.map((item) => item.proImgOption) : [];

  const [activeIndex, setActiveIndex] = useState(0); // Set initial active index to 0
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    // Reset active index to 0 when the component receives new images
    setActiveIndex(0);
  }, [props.images]);

  const showAllImages = window.innerWidth >= 2560;

  const handleMouseOver = () => {
    setZoom(2.5);
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
  

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      const image = e.target;
      const imageRect = image.getBoundingClientRect();
      const x = ((e.clientX - imageRect.left) / imageRect.width) * 100;
      const y = ((e.clientY - imageRect.top) / imageRect.height) * 100;
      setImagePosition({ x, y });
    }
  };

  // const handleDoubleClick = () => {
  //   // Toggle zoom on double-click
  //   setZoom((prevZoom) => (prevZoom === 1 ? 2.5 : 1));
  //   setIsZoomed((prevIsZoomed) => !prevIsZoomed);
  //   // Reset image position on double-click
  //   setImagePosition({ x: 0, y: 0 });
  // };
  useEffect(() => {
    // Add event listeners when component mounts
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Remove event listeners when component unmounts
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const imageStyle = {
    transform: `scale(${zoom})`,
    transition: isZoomed ? "transform 0.5s" : "none",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`, // Set the zoom origin based on mouse position
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Body>
          <Container
            style={{
              position: "fixed",
              top: "53%",
              left: "50%",
              margin: "auto",
            }}
            className="translate-middle productSliderStyle"
          >
            <Row>
              <Col md={10} className="d-md-block d-none">
              <Button
                  variant="secondary"
                  onClick={props.handleClose}
                  className="position-absolute top-0 translate-middle closeBtn"
                  style={{
                    zIndex: "3",
                    padding: "3px",
                    paddingTop: "0px",
                    right: "15%",
                  }}
                >
                  <img
                    src={cross}
                    style={{ width: "20px" }}
                    alt="Close button"
                  />
                </Button>
                <Carousel
                  fade
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                  interval={null}
                  style={{background: '#e9e9e9'}}
                  >
                  {sliderImagesData.map((image, index) => (
                    <Carousel.Item
                      key={index}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      onMouseMove={handleMouseMove}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchCancel={handleTouchOut}
                      onMouseDown={handleMouseDown}
                    >
                      <img
                        src={image}
                        className="img-fluid rounded"
                        style={imageStyle}
                        // height={'617px'}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col md={10} className="d-md-none d-block">
                <MobileImageCarousal 
                  handleClose ={props.handleClose}
                  activeIndex = {activeIndex}
                  handleSelect = {handleSelect}
                  handleMouseOver = {handleMouseOver}
                  handleMouseOut = {handleMouseOut}
                  handleMouseMove = {handleMouseMove}
                  handleTouchStart = {handleTouchStart}
                  handleTouchMove = {handleTouchMove}
                  handleTouchOut = {handleTouchOut}
                  handleMouseDown={handleMouseDown} 
                  sliderImagesData={sliderImagesData}
                  imageStyle={imageStyle}
                />
              </Col>
              <Col md={2} className="m-auto productOptionsSlide pt-3 position-relative d-flex align-items-center">
                <RightVerticalSlider slideOption={slideOption} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>

                {/* <MobileViewProductSlider 
                images={props.images}
                setActiveIndex = {setActiveIndex}
                activeIndex = {activeIndex}
                className='d-md-none d-block'/> */}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
