import React, { useEffect, useState } from "react";
import fetchApi from "../../Data/fetchApi";
import { useLocation } from "react-router-dom";
import { Container, Row, Image } from "react-bootstrap";

export default function CategorieWiseProducts() {
  const location = useLocation();
  const [productsList, setProductsList] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(false);
  const { loading, error, data } = fetchApi(
    "http://localhost:1337/api/small-images?populate=*"
  );

  useEffect(() => {
    if (data && data.data) {
      const useParams = new URLSearchParams(location.search);
      const type = useParams.get("product");
      const filteredProducts = data.data.filter(
        (pro) => pro.attributes.product_url === type
      );

      if (filteredProducts.length > 0) {
        setProductsList(filteredProducts);
      }
    }
  }, [data, location.search]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error:(</p>;

  if (productsList.length > 0) {
    return (
      <div>
        {productsList.map((productImage) => (
          <Container key={productImage.id}>
            <Row>
              {console.log(productsList)}
              <ul className="d-flex flex-wrap ps-0">
                {productImage.attributes.small_images.data.map(
                  (productImage, index) => (
                    <li key={index} className="listImageStyle pb-3">
                      <a
                        href="#"
                        className="pe-auto float-end fs-5 ms-auto"
                        style={{ color: "#000" }}
                        // onClick={() => handleShow(index)}
                      >
                        {selectedProductIndex === index ? (
                          <i className="fa-solid fa-heart"></i>
                        ) : (
                          <i className="fa-regular fa-heart"></i>
                        )}
                        {/* {console.log(selectedProductIndex === index)} */}
                      </a>
                      <Image
                        src={`http://localhost:1337${productImage.attributes.url}`}
                        className="py-3"
                        width={'50px'}
                      />
                    </li>
                  )
                )}
              </ul>
            </Row>
          </Container>
        ))}
      </div>
    );
  } else {
    return <div>Service not found</div>;
  }
}
