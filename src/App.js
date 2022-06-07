import React, { useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";

function App() {
  const [loading, setLoading] = useState(true);

  const spinnerLoading = ()=>{
    setLoading(false);
  };
  return (
    <div className="app">
      <Header />
      {loading && <ReactSpinner />}
      <Container spinner={spinnerLoading}/>
    </div>
  );
}

export default App;
