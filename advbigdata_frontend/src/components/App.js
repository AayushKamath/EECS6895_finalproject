import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../css/App.css';
import FormCard from './FormCard';
import { Predicter } from '../components/Predicter'

function Navbar() {
  return (
    <nav className="navbar">
      {/* <div className="navbar-brand">AnalyzeStock</div> */}
    </nav>
  );
}

function App() {
  const [stockName, setStockName] = useState('AAPL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('close');
  const [stockData, setStockData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [image, setImage] = useState(null);

  useEffect(() => {
    // prediction_helper()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/stockdata/${stockName}/`, {
        mode: 'cors'
      });
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error(error);
    }
  };



  const filteredData = stockData.filter((data) => {
    if (!startDate || !endDate) {
      return true;
    }
    const currentDate = new Date(data.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate >= start && currentDate <= end;
  });

  const openValue = filteredData[0]?.open;
  const closeValue = filteredData[filteredData.length - 1]?.close;
  const returnPercentage = ((closeValue - openValue) / openValue) * 100;

  const chartData = {
    labels: filteredData.map((data) => data.date),
    datasets: [
      {
        label: selectedAttribute,
        data: filteredData.map((data) => data[selectedAttribute]),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const images = [
    'https://i.ibb.co/r0xtrHv/P1.png',
    'https://i.ibb.co/1JtH5SF/P2.png',
    'https://i.ibb.co/GcJb70X/P3.png',
    'https://i.ibb.co/vXRsmb3/P4.png',
    'https://i.ibb.co/djDDFKf/P5.png'
  ];

  const text = [
    'Information Technology 1',
    'Information Technology 2',
    'Health Care',
    'Others + Consumer Discretionary',
    'Consumer Services + Industrials + Financials'
  ]
  return (
    <div className="App">
      <button className="show-popup-button" onClick={() => setShowPopup(true)}>Portfolio Options</button>

      {showPopup ? (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-button" onClick={() => setShowPopup(false)}>
              X
            </button>
            <div className="images-grid">
              {images.map((image, index) => (
                <div className=''>
                  <img key={index} src={image} alt={`image-${index}`} />
                  <h5>{text[index]}</h5>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <form onSubmit={handleSubmit} className="search-form">
            <label htmlFor="stockName">Enter Stock Name:</label>
            <input
              type="text"
              id="stockName"
              value={stockName}
              onChange={(event) => setStockName(event.target.value)}
            />
            <br />
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <br />
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
            <br />
            <label htmlFor="selectedAttribute">Select Attribute:</label>
            <select
              id="selectedAttribute"
              value={selectedAttribute}
              onChange={(event) => setSelectedAttribute(event.target.value)}
            >
              <option value="open">Open</option>
              <option value="high">High</option>
              <option value="low">Low</option>
              <option value="close">Close</option>
              <option value="volume">Volume</option>
            </select>
            <button type="submit">Submit</button>
          </form>
          {filteredData.length > 0 ? (
            <div className="chart-container">
              <div className="result-container">
                <p className="result-text">Return Percentage: <span className="result-value">{returnPercentage.toFixed(2)}%</span></p>
              </div>
              <Line data={chartData} />
            </div>
          ) : (
            <p style={{ color: "black" }}>No data available for {stockName}</p>
          )}
          <div className="form-card">
            <FormCard />
          </div>
          <Predicter

          />
        </>
      )}
    </div>
  );
}

export default App;

