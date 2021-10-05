import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
type T_Todos = {
  text: string;
  id: string;
};

const getInitialTodos = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

export default function TodosTest() {
  const [todos, setTodos] = useState<T_Todos[]>(getInitialTodos);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todos") || "");
  //   setTodos(todos);
  // }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "text":
        setText(value);
        break;

      case "filter":
        setFilter(value);
        break;

      default:
        console.warn(`type ${name} doesn't exist`);
    }
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      text,
      id: v4(),
    };
    text.length > 0 && setTodos((prev) => [...prev, todo]);
    setText("");
  };

  const deleteTodo = (todoId: string) => {
    const updatedTodoList = todos.filter(({ id }) => id !== todoId);
    setTodos(updatedTodoList);
  };

  const getOnlyVisibleTodos = () =>
    todos.filter(({ text }) => text.includes(filter));

  const visibleTodos = getOnlyVisibleTodos();

  return (
    <div>
      <form onSubmit={addTodo}>
        <button>Add todo</button>
        <input
          onChange={handleChangeInput}
          type="text"
          value={text}
          name="text"
        />
        <br /> <br />
        <br /> <br />
        <label>
          Filter todo
          <input
            onChange={handleChangeInput}
            type="text"
            value={filter}
            name="filter"
          />
        </label>
      </form>
      <ul>
        {visibleTodos.map(({ text, id }) => (
          <li key={id}>
            <span>{text}</span>
            <button onClick={() => deleteTodo(id)}>Remove todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
