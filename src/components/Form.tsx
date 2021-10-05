import React, { useState } from "react";

interface Props {
  onSubmit: (cred: { email: string; password: string }) => void;
}

export default function Form({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //для доступа к объекту event указывается интерфейс события
    const { name, value } = e.currentTarget;
    switch (name) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        console.warn("field doesn't exist");
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    //для доступа к объекту event указывается интерфейс события
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label>
          Email:
          <input onChange={onChange} type="text" name="email" />
        </label>
        <label>
          Password:
          <input onChange={onChange} type="password" name="password" />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
