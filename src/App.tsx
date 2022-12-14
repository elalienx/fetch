// Node modules
import { useEffect, useState } from "react";

// Project file
import FormCreate from "./components/FormCreate";
import ItemTodo from "./components/ItemTodo";
import eStatus from "./interfaces/eStatus";
import iTodo from "./interfaces/iTodo";

export default function App() {
  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iTodo>());

  // Properties
  const END_POINT = "https://jsonplaceholder.typicode.com/todos/";

  // Method
  useEffect(() => {
    fetch(END_POINT)
      .then((response) => response.json())
      .then((json) => onSuccess(json))
      .catch((error) => onFailure(error));
  }, []);

  function onSuccess(data: any): void {
    console.log("data", data);
    setData(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string): void {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  // Components
  const Items = data.map((item: iTodo) => (
    <ItemTodo key={item.id} item={item} />
  ));

  // Safeguard
  if (status === eStatus.LOADING) return <p>⏳ Loading...</p>;
  if (status === eStatus.ERROR) return <p>❌ Cannot connect to the server.</p>;
  if (data.length === 0) return <p>✅ You don't have any tasks left</p>;

  return (
    <div className="App">
      <h1>Fetch examples</h1>
      <FormCreate endpoint={END_POINT} />
      <hr />
      {Items}
    </div>
  );
}
