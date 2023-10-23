
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Breadcomes from './Breadcomes';
import { Link, useLocation } from 'react-router-dom';
import { proData } from '../Data/proData';
import Image from 'react-bootstrap/Image';
import ImageViewer from './ImageViewer';
import BeforeAfterViwer from './BeforeAfterViwer';


function Category() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');




  const handleClose = () => {
    setShow(false);
    // setSelectedProductIndex(false);

  }
  const handleShow = (i) => {
    setShow(true);
    setSelectedImage(matchingService.imgDatas[i].productLg);
    setSelectedProductIndex(i);
  }  

  const handleSelect = (selectedIndex) => {
    setSelectedProductIndex(selectedIndex);
  };

  const location = useLocation();
  const useParams = new URLSearchParams(location.search);
  const type = useParams.get('product');
  // const matchingService = proData.find((item)=>item.url === type);
  const matchingService = proData.find((item) => item.url === type);

  if (!matchingService) {
    return <div>Service not found</div>; // Handle the case where there's no matching service
  }
  const productListItems = matchingService.imgDatas ? matchingService.imgDatas.map((productItem, index) => (
    <li key={index} className='listImageStyle'>
        <a 
          href='#' 
          className="pe-auto float-end fs-5 ms-auto"
          style={{ color: '#000' }}
          onClick={()=> handleShow(index)}
        >
          {selectedProductIndex === index ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i> }
          {/* {console.log(selectedProductIndex === index)} */}
        </a>
        <Image 
          src={productItem.productSm} 
          rounded 
          className="img-fluid py-3"
          onClick={()=> handleShow(index)}
        />
    </li>
  )) : [];

  return (
     <>
        <Container>
          <Row>
            <Col className='pt-3' md={5}>
              <Breadcomes cat={matchingService.category} address={matchingService.alt} />
              <h4>{matchingService.alt}</h4>
              <p style={{ textAlign: 'left' }}>{matchingService.desc}</p>
            </Col>

            <Col md={7}>
              <Image src={matchingService.bannerImg} className='img-fluid' />
            </Col>
          </Row>
        </Container>

        <Container className='py-5'>
            <Row>
              <Col>
                <ul className="d-flex flex-wrap ps-0">{productListItems}</ul>
              </Col>
            </Row>
        </Container>

        {/* <ImageViewer show={show} handleClose={handleClose} images={matchingService.imgDatas.map((item) => item.productLg)} activeIndex={selectedProductIndex} /> */}
        {/* <ImageViewer show={show} handleClose={handleClose} images={matchingService.imgDatas.map((item)=>item.productLg)} activeIndex={selectedProductIndex} /> */}

        {/* <ImageViewer
          show={show}
          handleClose={handleClose}
          images={matchingService.imgDatas ? matchingService.imgDatas.map((item) => item.productLg) : []}
          activeIndex={selectedProductIndex}
        /> */}
{/* {console.log(type)} */}
        {type === 'models' ? 
                    // <BeforeAfterViwer show={show} handleClose={handleClose} 
                    //   images={matchingService.imgDatas ? matchingService.imgDatas.map((item) => item.productLg) : []}
                    //   handleSelect={handleSelect}
                    //   activeIndex={selectedProductIndex}
                    // /> 
                    <BeforeAfterViwer 
                      show={show} 
                      handleClose={handleClose}
                      images={matchingService.imgDatas.map((proItem)=>proItem.pro)}  
                    />
                    :  
                    <ImageViewer
                      show={show}
                      handleClose={handleClose}
                      images={matchingService.imgDatas ? matchingService.imgDatas.map((item) => item.productLg) : []}
                      activeIndex={selectedProductIndex}
                      handleSelect={handleSelect} // Pass the handleSelect function
                    />
        }
        

     </>
    )
}

export default Category