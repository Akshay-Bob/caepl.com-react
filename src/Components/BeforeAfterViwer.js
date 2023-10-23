import React from 'react'
import { Modal } from 'react-bootstrap'
import { Carousel } from 'bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


export default function BeforeAfterViwer(props) {
  return (
    <>
        <Modal show={props.show} onHide={props.handleClose}>
        <Button
            variant="secondary"
            onClick={props.handleClose}
            className="position-absolute top-0 start-100 translate-middle"
            style={{ zIndex: '1', padding: '6px', borderRadius: '50%' }}>
            &#10006;
        </Button>
            <Modal.Body>
                <Image src={props.images} className='img-fluid'/>
            </Modal.Body>
      </Modal>
    </>
    )
}
