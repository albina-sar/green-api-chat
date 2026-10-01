import { useEffect, useState } from "react";
import {
  deleteNotification,
  receiveNotification,
  sendMessage,
} from "../api/api";
import MessageList from "../UI/MessageList/MessageList";
import SubmitForm from "../UI/SubmitForm/SummitForm";
import PageTitle from "../UI/Title/PageTitle";
import styles from "./App.module.css";
import type { MessageType } from "./type";

const CHAT_ID = "79283922741@c.us";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = async (text: string) => {
    try {
      const result = await sendMessage(CHAT_ID, text);
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
    let isRunning = true;
    async function poll() {
      while (isRunning) {
        const result = await receiveNotification();
        if (result === null) continue;
        if (result.body.typeWebhook === "incomingMessageReceived") {
          if (result.body.messageData.typeMessage === "textMessage") {
            const name = result.body.senderData.senderName;
            const text = result.body.messageData.textMessageData.textMessage;
            setMessages((prev) => [...prev, { name, text, date: Date.now() }]);
          }
        }
        try {
          await deleteNotification(result.receiptId);
        } catch (err) {
          console.error("Ошибка удаления уведомления:", err);
        }
      }
    }
    poll();
    return () => {
      isRunning = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      <PageTitle title="GREEN-API Chat"></PageTitle>
      <MessageList messages={messages}></MessageList>
      <SubmitForm onSubmit={handleSendMessage}></SubmitForm>
    </div>
  );
}

export default App;
