import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <span>Countries app </span>is a simple React application. App uses{" "}
      <a href="https://restcountries.com/">https://restcountries.com/ </a> and{" "}
      <a href="https://openweathermap.org/">https://openweathermap.org/</a>
    </div>
  );
};

export default Home;
