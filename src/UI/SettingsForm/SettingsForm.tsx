import { useState } from "react";
import styles from "./SettingsForm.module.css";
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
      <h3 className={styles.title}>Авторизация</h3>
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          type="text"
          placeholder="Введите idInstance"
          value={id}
          onChange={handleChangeId}
          className={styles.inputs}
        />
        <input
          type="text"
          placeholder="Введите apiTokenInstance"
          value={token}
          onChange={handleChangeToken}
          className={styles.inputs}
        />
        <button type="submit" className={styles.button}>Сохранить</button>
      </form>
    </div>
  );
}

export default SettingsForm;
