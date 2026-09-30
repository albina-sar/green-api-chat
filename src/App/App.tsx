import { useState } from "react";
import MessageList from "../UI/MessageList/MessageList";
import SubmitForm from "../UI/SubmitForm/SummitForm";
import PageTitle from "../UI/Title/PageTitle";
import styles from "./App.module.css";
import type { MessageType } from "./type";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = (text: string) => {
const newMessage = {
  name: 'You',
   text,
   date: Date.now()
}
setMessages((prev) => [...prev, newMessage])
  };
  return (
    <div className={styles.container}>
      <PageTitle></PageTitle>
      <MessageList
        messages={messages}
      ></MessageList>
      <SubmitForm onSubmit={handleSendMessage}></SubmitForm>
    </div>
  );
}

export default App;
