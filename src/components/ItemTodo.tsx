// Project files
import iTodo from "../interfaces/iTodo";

interface iProps {
  item: iTodo;
}

export default function ItemTodo({ item }: iProps) {
  const { id, title, completed } = item;

  return (
    <article className="item-todo">
      <input type="checkbox" checked={completed} />
      <span className="number">{id}.- </span>
      {title}
    </article>
  );
}
