import { useEffect, useState } from "react";
import {
  deleteNotification,
  receiveNotification,
  sendMessage,
} from "../api/api";
import ChatForm from "../UI/ChatForm/ChatForm";
import MessageList from "../UI/MessageList/MessageList";
import SettingsForm from "../UI/SettingsForm/SettingsForm";
import SubmitForm from "../UI/SubmitForm/SummitForm";
import PageTitle from "../UI/Title/PageTitle";
import styles from "./App.module.css";
import type { MessageType } from "./type";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [id, setId] = useState<string | null>(() =>
    localStorage.getItem("green-api-id"),
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("green-api-token"),
  );
  const [chatId, setChatId] = useState<string | null>(() =>
    localStorage.getItem("green-api-chat-id"),
  );

  const handleSaveSettings = (id: string, token: string) => {
    setId(id);
    setToken(token);
    localStorage.setItem("green-api-id", id);
    localStorage.setItem("green-api-token", token);
  };

  const handleCreateChat = (chatId: string) => {
    setChatId(chatId);
    localStorage.setItem("green-api-chat-id", chatId);
  };
  const handleSendMessage = async (text: string) => {
    try {
      if (!id || !token || !chatId) return;
      const result = await sendMessage(id, token, chatId, text);
      console.log("Сообщение отправлено:", result);
      const newMessage = {
        name: "You",
        text,
        date: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    let isRunning = true;
    async function poll() {
      if (!id || !token) return;
      try {
        while (isRunning) {
          const result = await receiveNotification(id, token);
          if (result === null) continue;
          if (result.body.typeWebhook === "incomingMessageReceived") {
            if (result.body.messageData.typeMessage === "textMessage") {
              const senderChatId = result.body.senderData.chatId;
              if (senderChatId === chatId) {
                const name = result.body.senderData.senderName;
                const text =
                  result.body.messageData.textMessageData.textMessage;
                setMessages((prev) => [
                  ...prev,
                  { name, text, date: Date.now() },
                ]);
              }
            }
          }

          await deleteNotification(result.receiptId, id, token);
        }
      } catch (err) {
        console.error("poll упал:", err);
      }
    }
    poll();
    return () => {
      isRunning = false;
    };
  }, [id, token]);

  const handleChangeChat = () => {
    setChatId(null);
    localStorage.removeItem("green-api-chat-id");
    setMessages([]); // очистить сообщения старого чата
  };
  const handleLogout = () => {
    setId(null);
    setToken(null);
    setChatId(null);
    setMessages([]);
    localStorage.removeItem("green-api-id");
    localStorage.removeItem("green-api-token");
    localStorage.removeItem("green-api-chat-id");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PageTitle title="GREEN-API Chat" />
        {/* кнопки видны только в чате */}
        {id && token && chatId && (
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleChangeChat}>
              Сменить чат
            </button>
            <button className={styles.button} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        )}
      </div>

      {/* условный рендер — три состояния */}
      {!id || !token ? (
        <div className={styles.formContainer}>
          <SettingsForm onSave={handleSaveSettings} />
        </div>
      ) : !chatId ? (
        <ChatForm onCreate={handleCreateChat} />
      ) : (
        <>
          <div className={styles.messages}>
            <MessageList messages={messages} />
          </div>
          <div className={styles.form}>
            <SubmitForm onSubmit={handleSendMessage} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
