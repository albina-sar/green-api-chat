import { useState } from "react";
import { sendMessage } from "../api/api";
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
  return (
    <div className={styles.container}>
      <PageTitle title="GREEN-API Chat"></PageTitle>
      <MessageList messages={messages}></MessageList>
      <SubmitForm onSubmit={handleSendMessage}></SubmitForm>
    </div>
  );
}

export default App;
