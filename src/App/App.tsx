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
      while (isRunning) {
        const result = await receiveNotification(id, token);
        if (result === null) continue;
        if (result.body.typeWebhook === "incomingMessageReceived") {
          if (result.body.messageData.typeMessage === "textMessage") {
            const name = result.body.senderData.senderName;
            const text = result.body.messageData.textMessageData.textMessage;
            setMessages((prev) => [...prev, { name, text, date: Date.now() }]);
          }
        }
        try {
          await deleteNotification(result.receiptId, id, token);
        } catch (err) {
          console.error("Ошибка удаления уведомления:", err);
        }
      }
    }
    poll();
    return () => {
      isRunning = false;
    };
  }, [id, token]);

  return (
    <div className={styles.container}>
      <PageTitle title="GREEN-API Chat" />
      {!id || !token ? (
        <SettingsForm onSave={handleSaveSettings} />
      ) : !chatId ? (
        <ChatForm onCreate={handleCreateChat} />
      ) : (
        <>
          <MessageList messages={messages} />
          <SubmitForm onSubmit={handleSendMessage} />
        </>
      )}
    </div>
  );
}

export default App;
