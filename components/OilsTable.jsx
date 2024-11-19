import React from "react";
import styles from "./OilsTable.module.css"; // CSS Module for styling
import { oilsData } from "./data";

const OilsTable = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.oilTable}>
        <thead>
          <tr>
            <th></th>
            {oilsData.map((oil, index) => (
              <th key={index}>
                <img
                  src={oil.imgSrc}
                  alt={oil.name}
                  className={styles.oilImage}
                />
                <h3>{oil.name}</h3>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Uses</td>
            {oilsData.map((oil, index) => (
              <td key={index}>
                {oil.uses.map((use, idx) => (
                  <div key={idx}>{use}</div>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <td>Suitable Weather</td>
            {oilsData.map((oil, index) => (
              <td key={index}>{oil.weather}</td>
            ))}
          </tr>
          <tr>
            <td>Good For</td>
            {oilsData.map((oil, index) => (
              <td key={index}>{oil.benefits}</td>
            ))}
          </tr>
          <tr>
            <td>Aroma</td>
            {oilsData.map((oil, index) => (
              <td key={index}>{oil.aroma}</td>
            ))}
          </tr>
          <tr>
            <td>Nutrients (RDA)</td>
            {oilsData.map((oil, index) => (
              <td key={index}>{oil.nutrients}</td>
            ))}
          </tr>
          <tr>
            <td>Flavour</td>
            {oilsData.map((oil, index) => (
              <td key={index}>{oil.flavor}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OilsTable;
