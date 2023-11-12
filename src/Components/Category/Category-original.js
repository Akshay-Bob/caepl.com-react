import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchApi from "../../Data/fetchApi";
import { Container, Row, Col, Image } from "react-bootstrap";
import Breadcomes from "../Breadcomes";
import CategorieWiseProducts from "./CategorieWiseProducts";

export default function Category() {
  const location = useLocation();
  const [productsOfType, setProductsOfType] = useState([]);
  const { loading, error, data } = fetchApi(
    "http://localhost:1337/api/products?populate=*"
  );

  useEffect(() => {
    if (data && data.data) {
      const useParams = new URLSearchParams(location.search);
      const type = useParams.get("product");
      const filteredProducts = data.data.filter(
        (pro) => pro.attributes.url === type
      );

      if (filteredProducts.length > 0) {
        setProductsOfType(filteredProducts);
      }
    }
  }, [data, location.search]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error:(</p>;

  if (productsOfType.length > 0) {
    return (
      <div>
        {productsOfType.map((product) => (
          <Container key={product.id}>
            <Row className="pb-4">
              {/* {console.log(productsOfType)} */}
              <Col className="pt-3" md={5}>
                <Breadcomes
                  cat={product.attributes.category}
                  address={product.attributes.product_name}
                />
                {/* <h4>{matchingService.alt}</h4> */}
                <h4 style={{ textAlign: "left" }}>
                  {product.attributes.product_name}
                </h4>
                <p style={{ textAlign: "left" }}>
                  {product.attributes.description}
                </p>
              </Col>

              <Col md={7}>
                <Image
                  src={`http://localhost:1337${product.attributes.banner_image.data.attributes.url}`}
                  className="img-fluid py-3"
                />
              </Col>
            </Row>
          </Container>
        ))}
        <CategorieWiseProducts />
      </div>
    );
  } else {
    return <div>Service not found</div>;
  }
}
