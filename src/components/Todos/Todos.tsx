import React from "react";
import { v4 as uuidv4 } from "uuid";

// interface Props {
//   todoText: string;
//   todoList: string[];
// }

type Todo = {
  text: string;
  id: string;
  completed: boolean;
};

const getInitialTodoState = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

export default function TodosTypeScript() {
  const [filter, setFilter] = React.useState("");
  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>(getInitialTodoState);

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      text,
      id: uuidv4(),
      completed: false,
    };
    setTodos((prev) => [...prev, todo]);
    setText("");
  };

  const removeTodo = (todoId: string) => {
    const updatedTodoList = todos.filter(({ id }) => id !== todoId);
    setTodos(updatedTodoList);
  };

  const toggleCompleted = (todoId: string) => {
    const changeStatusCompleted = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(changeStatusCompleted);
  };

  const getVisibleTodos = () =>
    todos.filter(({ text }) => text.includes(filter));

  const visibleTodos = getVisibleTodos();

  // React.useEffect(() => {
  // Через "или" || отрабатывется исключение
  // из localStorage может прийти null, но JSON.parse принимает только строку

  // const todos = JSON.parse(localStorage.getItem("todos") || "");
  // setTodos(todos);
  // }, []);

  React.useEffect(() => {
    /* todos.length > 0 && */ localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  return (
    <>
      <form onSubmit={addTodo}>
        <button type="submit">Add todo</button>
        <input type="text" value={text} onChange={handleInputText} />
      </form>
      <ul>
        {visibleTodos.map(({ text, id }) => (
          <li key={id}>
            <span>{text}</span>
            <input onChange={() => toggleCompleted(id)} type="checkbox" />
            <button onClick={() => removeTodo(id)} type="button">
              Delete Todo
            </button>
          </li>
        ))}
      </ul>
      <label>
        Todos filter:
        <input type="text" value={filter} onChange={handleInputFilter} />
      </label>
    </>
  );
}
