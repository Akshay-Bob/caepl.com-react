import React from 'react'
import { Modal } from 'react-bootstrap'
import { Carousel } from 'bootstrap';
import Image from 'react-bootstrap/Image';


export default function BeforeAfterViwer(props) {
  return (
    <>
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Body style={{ overflow: 'hidden', textAlign: 'center' }}>
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
                        <Image
                            src={image}
                            rounded
                            className="img-fluid"
                            />

                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
        </Modal>    
    </>
    )
}
