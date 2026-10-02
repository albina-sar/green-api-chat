import { useState } from "react";
import { type SettingsFormProps } from "./type";

// Создаем форму для авторизации
function SettingsForm({ onSave }: SettingsFormProps) {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id.trim() || !token.trim()) return;
    onSave(id, token);
  };

  return (
    <div>
      <h1>Авторизация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите idInstance"
          value={id}
          onChange={handleChangeId}
        />
        <input
          type="text"
          placeholder="Введите apiTokenInstance"
          value={token}
          onChange={handleChangeToken}
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default SettingsForm;
