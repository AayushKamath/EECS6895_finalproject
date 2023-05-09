import React, { useState } from "react";



function StockForm() {
  const [low, setLow] = useState("");
  const [open, setOpen] = useState("");
  const [volume, setVolume] = useState("");
  const [high, setHigh] = useState("");
  const [adjustedClose, setAdjustedClose] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!low || !open || !volume || !high || !adjustedClose || !year || !month || !day) {
        setResponseMsg("Please fill in all fields.");
        return;
      }

    const formData = new FormData();
    formData.append("low", low);
    formData.append("open", open);
    formData.append("volume", volume);
    formData.append("high", high);
    formData.append("adjustedClose", adjustedClose);
    formData.append("year", year);
    formData.append("month", month);
    formData.append("day", day);
    console.log(Object.fromEntries(formData));
    try {
      const response = await fetch("http://127.0.0.1:8000/api/", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      const data = await response.json();
      console.log(data)
      setResponseMsg(data.prediction);
      // Handle success
      console.log("Form data submitted successfully");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  


  return (
    <div>
<form className="easyform" onSubmit={handleSubmit}>
  <div className="input-group">
    <label>
      Low:&ensp;&ensp;&ensp; &ensp; 
      <input
        type="text"
        value={low}
        onChange={(event) => setLow(event.target.value)}
      />
    </label>
    <label>
      Open:&ensp;
      <input
        type="text"
        value={open}
        onChange={(event) => setOpen(event.target.value)}
      />
    </label>
    <label>
      Volume:&ensp;
      <input
        type="text"
        value={volume}
        onChange={(event) => setVolume(event.target.value)}
      />
    </label>
    <label>
      High:&ensp;&ensp;
      <input
        type="text"
        value={high}
        onChange={(event) => setHigh(event.target.value)}
      />
    </label>
  </div>
  <div className="input-group">
    <label>
      <span style={{"position": "relative", "right": "10px"}}>AdjClose:</span>
       
      <input
        type="text"
        value={adjustedClose}
        onChange={(event) => setAdjustedClose(event.target.value)}
      />
    </label>
    <label>
      Year:&ensp;&ensp;
      <input
        type="text"
        value={year}
        onChange={(event) => setYear(event.target.value)}
      />
    </label>
    <label>
      Month:&ensp;&ensp;
      <input
        type="text"
        value={month}
        onChange={(event) => setMonth(event.target.value)}
      />
    </label>
    <label>
      Day:&ensp;&ensp;&ensp; 
      <input
        type="text"
        value={day}
        onChange={(event) => setDay(event.target.value)}
      />
    </label>
  </div>
  <div style={{"padding": "10px"}}>
  <button className="predict" style={{"margin-right": "40"}} type="submit">Predict</button>
  </div>
</form>

<div id="prediction" style={{ marginLeft: "100px"}}>
  {responseMsg && (
    <p style={{ marginLeft: "100px" ,justifyContent: "center", alignItems: "center", color: "blue", fontWeight: "bold" }}>
      Closing Value on {month}/{day}/{year} will be : {responseMsg}
    </p>
  )}
</div>

    </div>
  );
}

export default StockForm;
