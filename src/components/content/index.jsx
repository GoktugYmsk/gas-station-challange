import React, { useState, useEffect } from "react";
import axios from "axios";

import Dropdown from "react-bootstrap/Dropdown";

import { CITIES } from "../app/mockCities/index";
import FuelPricesTable from "./FuelPricesTable";

import "./index.scss";

const COMPANY_NAMES = {
  po: "Petrol Ofisi",
  opet: "Opet",
  alpet: "Alpet",
  tp: "Türkiye Petrolleri",
  sunpet: "Sunpet",
};

function Content({ selectedCompany, setSelectedCompany }) {
  const [selectedCity, setSelectedCity] = useState("34");
  const [fuelPrices, setFuelPrices] = useState(null);

  console.log("selectedCompany", selectedCompany, "selectedCity", selectedCity);

  const handleCitySelect = (cityId) => {
    setSelectedCity(cityId);
  };

  const handleCompanySelect = (companyCode) => {
    setSelectedCompany(companyCode);
  };

  const fetchData = async () => {
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const apiUrl = "https://akaryakit-fiyatlari.vercel.app/api/po/34";

    try {
      const response = await axios.get(proxyUrl + apiUrl);
      setFuelPrices(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity, selectedCompany]);

  const cityItems = Object.entries(CITIES).map(([cityId, cityName]) => (
    <Dropdown.Item
      key={cityId}
      href={`#/city-${cityId}`}
      active={cityId === selectedCity}
      onClick={() => handleCitySelect(cityId)}
    >
      {cityName}
    </Dropdown.Item>
  ));

  const companyItems = Object.keys(COMPANY_NAMES).map((companyCode) => (
    <Dropdown.Item
      key={companyCode}
      active={companyCode === selectedCompany}
      onClick={() => handleCompanySelect(companyCode)}
    >
      {COMPANY_NAMES[companyCode]}
    </Dropdown.Item>
  ));

  return (
    <div className="container-content">
      <div className="container-content__top">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="city-dropdown">
              {CITIES[selectedCity]}
            </Dropdown.Toggle>
            <Dropdown.Menu>{cityItems}</Dropdown.Menu>
          </Dropdown>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="danger" id="company-dropdown">
            {COMPANY_NAMES[selectedCompany]}
          </Dropdown.Toggle>
          <Dropdown.Menu>{companyItems}</Dropdown.Menu>
        </Dropdown>
      </div>

      <FuelPricesTable fuelPrices={fuelPrices} />
    </div>
  );
}

export default Content;
