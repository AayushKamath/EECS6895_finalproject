import React from 'react';
import { Line } from 'react-chartjs-2';

function GraphCard({ stockName, startDate, endDate, selectedAttribute, stockData, handleSubmit }) {
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
        label: `${selectedAttribute.toUpperCase()} Value`,
        data: filteredData.map((data) => data[selectedAttribute]),
        borderColor: 'rgba(0, 0, 255, 0.5)',
        fill: false,
      },
    ],
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="stockName">Enter Stock Name:</label>
        <input
          type="text"
          id="stockName"
          value={stockName}
          onChange={(event) => setStockName(event.target.value)}
        />
        <br/>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <br/>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
        <br/>
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
        <p style={{color: "black"}}>No data available for {stockName}</p>
      )}
    </div>
  );
}

export default GraphCard;
