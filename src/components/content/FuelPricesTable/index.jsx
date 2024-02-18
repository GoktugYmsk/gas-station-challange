import React from "react";

function FuelPricesTable({ fuelPrices }) {
  if (!fuelPrices) {
    return null;
  }

  return (
    <div>
      <p>Son Yenileme: {fuelPrices.sonYenileme}</p>
      <table className="table">
        <thead>
          <tr>
            <th>İlçe</th>
            <th>Benzin</th>
            <th>Mazot</th>
            <th>LPG</th>
          </tr>
        </thead>
        <tbody>
          {fuelPrices.fiyatlar.map((item) => (
            <tr key={item.ilce}>
              <td>{item.ilce}</td>
              <td>{item.benzin}</td>
              <td>{item.mazot}</td>
              <td>{item.lpg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FuelPricesTable;
