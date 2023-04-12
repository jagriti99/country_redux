import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { initializeCountries } from "../features/countriesSlice";
import { addFavourites, removeFavourites } from "../features/favouritesSlice";

import "./Countries.css";

const Countries = () => {
  let numFormatter = require("@skalwar/simple_number_formatter");
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  return (
    <Container fluid className="container">
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {loading ? "Loading... " : " "}
        {countriesList
          .filter((countries) => {
            return countries.name.common
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country, i) => (
            <Col key={i} className="mt-5">
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card className="h-100 countriesCard">
                  {favouritesList.includes(country.name.common) ? (
                    <i
                      className="bi bi-heart-fill text-danger m-1 p-1 favIcon"
                      onClick={() =>
                        dispatch(removeFavourites(country.name.common))
                      }
                    ></i>
                  ) : (
                    <i
                      className="bi bi-heart text-danger m-1 p-1 favIcon"
                      onClick={() =>
                        dispatch(addFavourites(country.name.common))
                      }
                    ></i>
                  )}
                  <Card.Img
                    variant="top"
                    src={country?.flags?.svg}
                    alt={country.flags.alt}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="countriesCard-title">
                      {country.name.common}
                    </Card.Title>
                    <ListGroup className=" flex-grow-1 justify-content-end card-icon">
                      <ListGroup.Item>
                        <i className="bi bi-globe2 me-2">
                          {" "}
                          {country.name.official}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2">
                          {" "}
                          {Object.values(country.currencies || {})
                            .map((currency) => currency.name)
                            .join(", ")}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-people me-2">
                          {" "}
                          {numFormatter(country.population)}
                        </i>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
