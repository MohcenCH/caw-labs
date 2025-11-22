import { useState } from "react";

export default function App() {
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [color, setColor] = useState("");

  const [divs, setDivs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDiv = { height, width, color };
    setDivs([...divs, newDiv]);

    setHeight("");
    setWidth("");
    setColor("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Div</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Height (px): </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Width (px): </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Background Color: </label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder=""
            required
          />
        </div>

        <button type="submit">Add Div</button>
      </form>

      <hr />

      <h2>Divs Display</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {divs.map((div, index) => (
          <div
            key={index}
            style={{
              height: `${div.height}px`,
              width: `${div.width}px`,
              backgroundColor: div.color,
              border: "1px solid black"
            }}
          />
        ))}
      </div>
    </div>
  );
}
