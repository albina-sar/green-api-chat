import { useState } from "react";
import { type ChatFormProps } from "./type";
import styles from './ChatForm.module.css'

//Создаем форму для ввода получателя сообщения
function ChatForm({ onCreate }: ChatFormProps) {
  const [chatId, setChatId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatId(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatId.trim()) return;
    onCreate(chatId);
  };
  return (
    <div>
      <h1 className={styles.title}>Создайте чат</h1>
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          type="text"
          value={chatId}
          placeholder="Введите chatId"
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Создать чат</button>
      </form>
    </div>
  );
}

export default ChatForm;
