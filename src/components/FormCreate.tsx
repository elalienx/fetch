// Node modules
import { FormEvent, useState } from "react";

interface iProps {
  endpoint: string;
}

export default function FormCreate({ endpoint }: iProps) {
  // Local state
  const [title, setTitle] = useState("");

  // Properties

  const METHOD = "POST"; // refactor
  const HEADERS = { "Content-type": "application/json; charset=UTF-8" };

  // Methods
  function onSubmit(event: FormEvent) {
    event.preventDefault(); // to avoid page reload

    fetch(endpoint, {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify({
        title: title,
        userId: 1,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((json) => onSuccess(json))
      .catch((error) => onFailure(error));
  }

  function onSuccess(result: any) {
    alert("We store your todo");
    console.log(result);
  }

  function onFailure(error: string) {
    alert("Could not store information into the database");
    console.error(error);
  }

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <input
        type="text"
        placeholder="Buy carrots"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button>Add item</button>
    </form>
  );
}
