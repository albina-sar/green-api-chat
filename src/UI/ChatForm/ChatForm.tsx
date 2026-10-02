import { useState } from "react";
import { type ChatFormProps } from "./type";

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
      <h1>Создайте чат</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={chatId}
          placeholder="Введите chatId"
          onChange={handleChange}
        />
        <button type="submit">Создать чат</button>
      </form>
    </div>
  );
}

export default ChatForm;
