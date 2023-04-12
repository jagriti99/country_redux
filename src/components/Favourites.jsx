import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { initializeCountries } from "../features/countriesSlice";
import { addFavourites, clearFavourites } from "../features/favouritesSlice";

import "./Favourites.css";
import "./Countries.css";

const Favourites = () => {
  let numFormatter = require("@skalwar/simple_number_formatter");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let countriesList = useSelector((state) => state.countries.countries);
  const favouriteList = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  const [favouritesList, setFavouritesList] = useState([]);

  if (favouritesList !== null) {
    countriesList = countriesList.filter((c) =>
      favouritesList.includes(c.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    setFavouritesList(localStorage.getItem("Favourites"));
  }, [dispatch]);
  console.log("Search: ", search);
  console.log("CountriesList", countriesList);
  console.log("loading state", loading);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  return (
    <Container fluid>
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
      <Row className="justify-content-between">
        <Col md={4}>
          <Button variant="light" onClick={() => navigate("/countries")}>
            <i className="bi bi-arrow-left"></i>
          </Button>
        </Col>
        <Col md={4}>
          <Link
            to="/countries"
            ms={0}
            onClick={() => {
              dispatch(clearFavourites());
            }}
          >
            <Button className="button">Clear favourites</Button>
          </Link>
        </Col>
      </Row>

      <Row xs={3} md={4} lg={4} className=" g-3">
        {loading ? "Loading... " : " "}
        {countriesList
          .filter((countries) => {
            return countries.name.common
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((country, i) => (
            <Col key={i} className="mt-5">
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card className="h-100 countriesCard">
                  {favouriteList.includes(country.name.common) ? (
                    <i className="bi bi-heart-fill text-danger m-1 p-1 favIcon"></i>
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
                    <ListGroup className="flex-grow-1 justify-content-end card-icon">
                      <ListGroup.Item>
                        <i className="bi bi-globe2 me-2">
                          {" "}
                          {country.name.official}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2 ">
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

export default Favourites;
