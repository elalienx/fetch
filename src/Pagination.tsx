// Node modules
import { useEffect, useState } from "react";
import ItemTodo from "./components/ItemTodo";
import eStatus from "./interfaces/eStatus";
import iTodo from "./interfaces/iTodo";

export default function App() {
  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState(new Array<iTodo>());
  const [pageNumber, setPageNumber] = useState(1);

  // Properties
  const END_POINT = `https://jsonplaceholder.typicode.com/todos/${pageNumber}`;

  // Method
  useEffect(() => {
    setStatus(eStatus.LOADING);
    fetch(END_POINT)
      .then((response) => response.json())
      .then((json) => onSuccess(json))
      .catch((error) => onFailure(error));
  }, [pageNumber]);

  function onSuccess(data: iTodo): void {
    console.log("data", data);
    const myData: iTodo[] = [data];

    setData(myData);
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
  if (status === eStatus.ERROR) return <p>❌ Cannot connect to the server.</p>;
  if (data.length === 0) return <p>✅ You don't have any tasks left</p>;

  return (
    <div className="App">
      <h1>Fetch examples @{pageNumber}@</h1>
      {status === eStatus.LOADING ? <p>⏳ Loading...</p> : Items}
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev page</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next page</button>
    </div>
  );
}
