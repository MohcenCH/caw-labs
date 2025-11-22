import DisplayTab from "./DisplayTab";

export default function DisplayTabUsed() {
  const tab1 = ["hello", "world", "from", "react"];
  const tab2 = ["foo", "bar", "baz", "qux"];

  return (
    <div>
      <h2>First Table</h2>
      <DisplayTab tab={tab1} />

      <h2>Second Table</h2>
      <DisplayTab tab={tab2} />
    </div>
  );
}