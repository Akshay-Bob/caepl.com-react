import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcomes from "../Breadcomes";
import { Link, useLocation } from "react-router-dom";
import { proData } from "../../Data/proData";
import Image from "react-bootstrap/Image";
import ImageViewer from "../ImageViewer";
import ProductImageSlider from "../ProductImageSlider/ProductImageSlider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Carousal from "../Carousals/Carousal";

function Category() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSlideImage, setSelectedSlideImage] = useState();
  const [display, setDisplay] = useState("none");

  const handleClose = () => {
    setShow(false);
    // setSelectedProductIndex(false);
  };
  const handleShow = (i) => {
    setShow(true);
    setSelectedImage(matchingService.imgDatas[i].productSm);
    setSelectedProductIndex(i);
    // alert(i)
    console.log(i);
    setDisplay("block");
    setSelectedSlideImage(i);
  };

  const handleSelect = (selectedIndex) => {
    setSelectedProductIndex(selectedIndex);
  };

  const location = useLocation();
  const useParams = new URLSearchParams(location.search);
  const type = useParams.get("product");
  const matchingService = proData.find((item) => item.url === type);

  if (!matchingService) {
    return <div>Service not found</div>; // Handle the case where there's no matching service
  }
  const productListItems = matchingService.imgDatas
    ? matchingService.imgDatas.map((productItem, index) => (
        <li key={index} className="listImageStyle">
          <Image
            src={productItem.productSm}
            rounded
            className="img-fluid py-3"
            onClick={() => handleShow(index)}
            style={{ cursor: "pointer" }}
            // width={'200px'}
          />
        </li>
      ))
    : [];

  const imageViews = matchingService.imgDatas
    ? matchingService.imgDatas.map((item) => item.imageView)
    : [];

  return (
    <>
      <Container>
        <Row>
          <Col className="pt-3" md={5}>
            <Breadcomes
              cat={matchingService.category}
              address={matchingService.alt}
            />
            <h4>{matchingService.alt}</h4>
            <p style={{ textAlign: "left" }}>{matchingService.desc}</p>
          </Col>
          <Col md={7}>
            <Image src={matchingService.bannerImg} className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <Container className="pt-5 pb-4">
        <Row>
          <Col>
            <ul
              className="ps-0 productImgStyle"
              style={{ display: "grid", gridAutoRows: "auto" }}
            >
              {productListItems}
            </ul>
          </Col>
        </Row>
      </Container>

      {/* {console.log(type)} */}
      {type === "invitation" ? (
        <ProductImageSlider
          images={imageViews[selectedSlideImage]}
          activeIndex={selectedSlideImage}
          show={show}
          handleSelect={handleSelect} // Pass the handleSelect function
          handleClose={handleClose}
          display={display}
        />
      ) : (
        <ImageViewer
          show={show}
          handleClose={handleClose}
          images={
            matchingService.imgDatas
              ? matchingService.imgDatas.map((item) => item.productLg)
              : []
          }
          activeIndex={selectedProductIndex}
          handleSelect={handleSelect} // Pass the handleSelect function
        />
      )}
    </>
  );
}

export default Category;
