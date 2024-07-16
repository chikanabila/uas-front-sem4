// src/components/CarList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/cars')
      .then(response => {
        console.log('Response from server:', response.data);
        const carsWithDate = response.data.map(car => ({
          ...car,
          tanggal_keluar: new Date(car.tanggal_keluar)
        }));
        setCars(carsWithDate);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  return (
    <div>
      <h2><b>Car List</b></h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? cars.map(car => (
            <tr key={car._id}>
              <td>{car.nama}</td>
              <td>{car.model}</td>
              <td>{car.tahun_keluar}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
