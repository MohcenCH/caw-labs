import { useState } from "react";

export default function ToggleButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button onClick={() => setClicked(!clicked)}>
        Toggle
      </button>
      <p>{clicked ? "Clicked" : "Not clicked"}</p>
    </div>
  );
}
