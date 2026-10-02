import React, { useState } from "react";
import styles from "./SubmitForm.module.css";
import { type SubmitFormProps } from "./type";

// Создаем форму для отправки сообщения
function SubmitForm({ onSubmit }: SubmitFormProps) {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    onSubmit(input);
    setInput("");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={input}
          placeholder="Введите текст"
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <button type="submit" className={styles.button}>
          Отправить
        </button>
      </div>
    </form>
  );
}

export default SubmitForm;
