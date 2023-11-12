import React from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { proData } from "../Data/proData";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import cross from "../Images/cross.svg";

export default function BeforeAfterViwer(props) {
  const [selectBfAfImg, setSelectBfAfImg] = useState(true);

  const footerStyle = {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    right: 0,
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    border: 0,
  };

  const btnStyle1 = {
    background: "rgb(0 0 0 / 86%)",
    border: "none",
    cursor: "pointer",
  };

  const btnStyle2 = {
    background: "rgb(0 0 0 / 86%)",
    border: "none",
    cursor: "pointer",
  };

  const handleshowAfterImage = () => {
    setSelectBfAfImg(!selectBfAfImg);
  };

  const handleshowBeforeImage = () => {
    setSelectBfAfImg(!selectBfAfImg);
  };

  const location = useLocation();
  const useParams = new URLSearchParams(location.search);
  const type = useParams.get("product");
  // const matchingService = proData.find((item)=>item.url === type);
  const matchingService = proData.find((item) => item.url === type);
  // console.log(matchingService);

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Button
          variant="secondary"
          onClick={props.handleClose}
          className="position-absolute top-0 start-100 translate-middle"
          style={{ zIndex: "3", padding: "3px", paddingTop: "0px" }}
        >
          <img src={cross} style={{ width: "20px" }} />
        </Button>
        <Modal.Body>
          <Carousel
            fade
            activeIndex={props.activeIndex}
            onSelect={(selectedIndex, e) => {
              props.handleSelect(selectedIndex);
              if (selectedIndex > props.activeIndex) {
                setSelectBfAfImg(true); // Show 'After' image
              } else {
                setSelectBfAfImg(true); // Show 'Before' image
              }
            }}
            interval={null}
          >
            {props.images.map((image, index) => (
              <Carousel.Item key={index}>
                {/* <Image src={image} rounded className="img-fluid" style={imageStyle} /> */}

                {/* <Image
                  src={selectBfAfImg ? image.productLgAfter : image.productLgBefore}
                  rounded
                  className="img-fluid"
                /> */}

                {/* <LazyLoadImage
                  src={
                    selectBfAfImg ? image.productLgAfter : image.productLgBefore
                  }
                  rounded
                  effect="opacity"
                  width="auto"
                  height="635px"
                  className="mobileImage"
                />   */}

                <Image
                  src={image.productLgAfter}
                  rounded
                  effect="opacity"
                  width="auto"
                  height="635px"
                  className="mobileImage"
                />
                {/* {console.log(image)} */}
                {/* <Modal.Footer style={footerStyle}>
                  <Button
                    style={btnStyle2}
                    onMouseOver={handleshowBeforeImage}
                    className={selectBfAfImg ? "notdiable" : "disabled"}
                  >
                    Before
                  </Button>
                  <Button
                    style={btnStyle1}
                    onMouseOver={handleshowAfterImage}
                    className={selectBfAfImg ? "disabled" : "notdiable"}
                  >
                    After
                  </Button>
                </Modal.Footer> */}
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}
