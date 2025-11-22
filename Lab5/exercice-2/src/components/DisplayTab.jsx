import { useState } from "react";

export default function DisplayTab({ tab }) {
  const [items, setItems] = useState(tab);

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <p key={index} onClick={() => handleRemove(index)}>
          Element {index + 1} is {item}
        </p>
      ))}
    </div>
  );
}
