import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "./index.scss";
import { CITIES } from "../app/mockCities/index";

const COMPANY_NAMES = {
  po: "Petrol Ofisi",
  opet: "Opet",
  alpet: "Alpet",
  tp: "Türkiye Petrolleri",
  sunpet: "Sunpet",
};

function Content() {
  const [selectedCity, setSelectedCity] = useState("34");
  const [selectedCompany, setSelectedCompany] = useState("po");
  const [fuelPrices, setFuelPrices] = useState(null);

  console.log("selectedCompany", selectedCompany, "selectedCity", selectedCity);

  const handleCitySelect = (cityId) => {
    setSelectedCity(cityId);
  };

  const handleCompanySelect = (companyCode) => {
    setSelectedCompany(companyCode);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/${selectedCompany}/${selectedCity}`
      );

      console.log("response", response);
      setFuelPrices(response.data);
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
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="city-dropdown">
            {CITIES[selectedCity]}
          </Dropdown.Toggle>
          <Dropdown.Menu>{cityItems}</Dropdown.Menu>
        </Dropdown>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="company-dropdown">
          {COMPANY_NAMES[selectedCompany]}
        </Dropdown.Toggle>
        <Dropdown.Menu>{companyItems}</Dropdown.Menu>
      </Dropdown>

      {fuelPrices && (
        <div>
          <p>Son Yenileme: {fuelPrices.sonYenileme}</p>
          <ul>
            {fuelPrices.fiyatlar.map((item) => (
              <li key={item.ilce}>
                {item.ilce} - Benzin: {item.benzin}, Mazot: {item.mazot}, LPG:{" "}
                {item.lpg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Content;
